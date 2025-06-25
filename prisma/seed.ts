import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
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

  const pjMembers = await Promise.all([
    prisma.pjMember.create({
      data: {
        member_id: 'PM00001',
        member_type: 'MANAGER',
        created_by: 'system'
      }
    }),
    prisma.pjMember.create({
      data: {
        member_id: 'PM00002',
        member_type: 'DEVELOPER',
        created_by: 'system'
      }
    })
  ]);

  const userGroups = await Promise.all([
    prisma.userGroup.upsert({
      where: { groupId: 'gp00001' },
      update: {},
      create: {
        groupId: 'gp00001',
        name: 'BD',
        systemType: 'INTERNAL',
        description: 'Business Development',
        permission: {},
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
        permission: {},
        createdBy: 'system'
      }
    })
  ]);

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

  console.log('✅ Database seeded successfully:');
  console.log(`- Roles: ${roles.length}`);
  console.log(`- Project Members: ${pjMembers.length}`);
  console.log(`- User Groups: ${userGroups.length}`);
  console.log(`- Users: ${users.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
