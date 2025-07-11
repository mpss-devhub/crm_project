import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const permissionTree = [
    {
      name: "User Management",
      group: "user",
      children: [
        { name: "View Users", group: "user" },
        { name: "Edit Users", group: "user" },
        { name: "Create Users", group: "user" },
        { name: "List Users", group: "user" },
        { name: "Permission", group: "user" },
      ],
    },
    {
      name: "Member Management",
      group: "member",
      children: [
        { name: "View Member", group: "member" },
        { name: "Edit Member", group: "member" },
        { name: "Create Member", group: "member" },
        { name: "List Member", group: "member" },
        { name: "Approve", group: "member" },
      ],
    },
    {
      name: "Project Management",
      group: "project",
      children: [
        { name: "View Projects", group: "project" },
        { name: "Edit Projects", group: "project" },
        { name: "Create Projects", group: "project" },
        { name: "List Projects", group: "project" },
      ],
    },
    {
      name: "Issue Management",
      group: "issue",
      children: [
        { name: "View Issues", group: "issue" },
        { name: "Edit Issues", group: "issue" },
        { name: "Create Issues", group: "issue" },
        { name: "List Issues", group: "issue" },
        { name: "Priority", group: "issue" },
      ],
    },
  ];

  // First, create all permissions with their hierarchy
  const createdPermissions = [];
  
  for (const parentPermission of permissionTree) {
    // Create parent permission
    const parent = await prisma.permission.create({
      data: {
        name: parentPermission.name,
        group: parentPermission.group,
      },
    });

    // Create child permissions
    for (const childPermission of parentPermission.children) {
      const child = await prisma.permission.create({
        data: {
          name: childPermission.name,
          group: childPermission.group,
          parentId: parent.id,
        },
      });
      createdPermissions.push(child);
    }
    createdPermissions.push(parent);
  }

  // Seed roles
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'SUPER_ADMIN' },
      update: {},
      create: {
        name: 'SUPER_ADMIN',
        description: 'Full system access'
      }
    }),
    prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: {
        name: 'ADMIN',
        description: 'Administrative access'
      }
    }),
    prisma.role.upsert({
      where: { name: 'USER' },
      update: {},
      create: {
        name: 'USER',
        description: 'Standard user access'
      }
    })
  ]);

  // Seed project members
  const pjMembers = await Promise.all([
    prisma.pjMember.upsert({
      where: { member_id: 'PM00001' },
      update: {},
      create: {
        member_id: 'PM00001',
        member_type: 'MANAGER',
        created_by: 'system'
      }
    }),
    prisma.pjMember.upsert({
      where: { member_id: 'PM00002' },
      update: {},
      create: {
        member_id: 'PM00002',
        member_type: 'DEVELOPER',
        created_by: 'system'
      }
    })
  ]);

  // Seed user groups
  const userGroups = await Promise.all([
    prisma.userGroup.upsert({
      where: { groupId: 'gp00001' },
      update: {},
      create: {
        groupId: 'gp00001',
        name: 'BD',
        systemType: 'INTERNAL',
        description: 'Business Development',
        createdBy: 'system'
      }
    }),
    prisma.userGroup.upsert({
      where: { groupId: 'gp00002' },
      update: {},
      create: {
        groupId: 'gp00002',
        name: 'PMO',
        systemType: 'INTERNAL',
        description: 'Project Management Office',
        createdBy: 'system'
      }
    })
  ]);

  // Assign all permissions to the user groups
  for (const group of userGroups) {
    for (const permission of createdPermissions) {
      await prisma.groupPermission.create({
        data: {
          userGroupId: group.id,
          permissionId: permission.id,
        },
      });
    }
  }

  // Seed users
  const password = await hash('securepassword123', 12);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'superadmin@example.com' },
      update: {},
      create: {
        user_id: 'SA00001',
        name: 'Super Admin',
        email: 'superadmin@example.com',
        phone: '0912345678',
        password,
        role_id: roles.find((r) => r.name === 'SUPER_ADMIN')!.id,
        pj_member_id: pjMembers[0].id,
        user_group_id: userGroups.find((g) => g.groupId === 'gp00001')!.groupId,
        department: 'IT',
        created_by: 'system'
      }
    }),
    prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        user_id: 'AD00001',
        name: 'Admin User',
        email: 'admin@example.com',
        phone: '0912345679',
        password,
        role_id: roles.find((r) => r.name === 'ADMIN')!.id,
        pj_member_id: pjMembers[0].id,
        user_group_id: userGroups.find((g) => g.groupId === 'gp00002')!.groupId,
        department: 'Management',
        created_by: 'system'
      }
    })
  ]);

  console.log('Database seeded successfully:');
  console.log(`- Roles: ${roles.length}`);
  console.log(`- Project Members: ${pjMembers.length}`);
  console.log(`- User Groups: ${userGroups.length}`);
  console.log(`- Permissions: ${createdPermissions.length}`);
  console.log(`- Users: ${users.length}`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });