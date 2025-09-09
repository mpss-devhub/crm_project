<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::truncate();
        $root = Permission::create([
            'id' => 1,
            'permission_id' => 'p000001',
            'name' => 'all_permissions',
            'label' => 'All Permissions',
            
            'group' => ''
        ]);

        $userManagement = Permission::create([
            'id' => 2,
            'permission_id' => 'p000002',
            'name' => 'user_management',
            'label' => 'User Management',
            'parent_id' => $root->id,
            
            'group' => 'user'
        ]);

        $userPermissions = [
            ['id' => 3, 'permission_id' => 'p000003', 'name' => 'view_users', 'label' => 'View Users',  'group' => 'user'],
            ['id' => 4, 'permission_id' => 'p000004', 'name' => 'edit_users', 'label' => 'Edit Users',  'group' => 'user'],
            ['id' => 5, 'permission_id' => 'p000005', 'name' => 'create_users', 'label' => 'Create Users',  'group' => 'user'],
            ['id' => 6, 'permission_id' => 'p000006', 'name' => 'list_users', 'label' => 'List Users',  'group' => 'user'],
            ['id' => 7, 'permission_id' => 'p000007', 'name' => 'user_permission', 'label' => 'Permission',  'group' => 'user'],
        ];

        foreach ($userPermissions as $permission) {
            Permission::create(array_merge($permission, ['parent_id' => $userManagement->id]));
        }

        $memberManagement = Permission::create([
            'id' => 8,
            'permission_id' => 'p000008',
            'name' => 'member_management',
            'label' => 'Member Management',
            'parent_id' => $root->id,
            
            'group' => 'member'
        ]);

        $memberPermissions = [
            ['id' => 9, 'permission_id' => 'p000009', 'name' => 'view_member', 'label' => 'View Member',  'group' => 'member'],
            ['id' => 10, 'permission_id' => 'p000010', 'name' => 'edit_member', 'label' => 'Edit Member',  'group' => 'member'],
            ['id' => 11, 'permission_id' => 'p000011', 'name' => 'create_member', 'label' => 'Create Member',  'group' => 'member'],
            ['id' => 12, 'permission_id' => 'p000012', 'name' => 'list_member', 'label' => 'List Member',  'group' => 'member'],
            ['id' => 13, 'permission_id' => 'p000013', 'name' => 'approve_member', 'label' => 'Approve',  'group' => 'member'],
        ];

        foreach ($memberPermissions as $permission) {
            Permission::create(array_merge($permission, ['parent_id' => $memberManagement->id]));
        }

        $projectManagement = Permission::create([
            'id' => 14,
            'permission_id' => 'p000014',
            'name' => 'project_management',
            'label' => 'Project Management',
            'parent_id' => $root->id,
            
            'group' => 'project'
        ]);

        $projectPermissions = [
            ['id' => 15, 'permission_id' => 'p000015', 'name' => 'view_projects', 'label' => 'View Projects',  'group' => 'project'],
            ['id' => 16, 'permission_id' => 'p000016', 'name' => 'edit_projects', 'label' => 'Edit Projects',  'group' => 'project'],
            ['id' => 17, 'permission_id' => 'p000017', 'name' => 'create_projects', 'label' => 'Create Projects',  'group' => 'project'],
            ['id' => 18, 'permission_id' => 'p000018', 'name' => 'list_projects', 'label' => 'List Projects',  'group' => 'project'],
        ];

        foreach ($projectPermissions as $permission) {
            Permission::create(array_merge($permission, ['parent_id' => $projectManagement->id]));
        }

        $issueManagement = Permission::create([
            'id' => 19,
            'permission_id' => 'p000019',
            'name' => 'issue_management',
            'label' => 'Issue Management',
            'parent_id' => $root->id,
            
            'group' => 'issue'
        ]);

        $issuePermissions = [
            ['id' => 20, 'permission_id' => 'p000020', 'name' => 'view_issues', 'label' => 'View Issues',  'group' => 'issue'],
            ['id' => 21, 'permission_id' => 'p000021', 'name' => 'edit_issues', 'label' => 'Edit Issues',  'group' => 'issue'],
            ['id' => 22, 'permission_id' => 'p000022', 'name' => 'create_issues', 'label' => 'Create Issues',  'group' => 'issue'],
            ['id' => 23, 'permission_id' => 'p000023', 'name' => 'list_issues', 'label' => 'List Issues',  'group' => 'issue'],
            ['id' => 24, 'permission_id' => 'p000024', 'name' => 'priority_issues', 'label' => 'Priority',  'group' => 'issue'],
        ];

        foreach ($issuePermissions as $permission) {
            Permission::create(array_merge($permission, ['parent_id' => $issueManagement->id]));
        }
    }
}