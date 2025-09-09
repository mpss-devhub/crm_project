<?php

namespace App\Dao;

use App\Contracts\Dao\PermissionDaoInterface;
use App\Models\Permission;

class PermissionDao implements PermissionDaoInterface
{
    /**
     * To get permission
     * @return $permission
     */
    public function getPermissionList()
    {
        $permissions = Permission::all();
        $permissionsByParent = $permissions->groupBy('parent_id');
        $buildGroup = function ($parentId) use (&$permissionsByParent, &$buildGroup) {
            $result = [];
            if (!isset($permissionsByParent[$parentId])) {
                return $result;
            }
            foreach ($permissionsByParent[$parentId] as $perm) {
                $children = $buildGroup($perm->id);

                if (!empty($children)) {
                    $result[$perm->group] = array_values($children);
                } else {
                    $result[] = $perm->name;
                }
            }
            return $result;
        };
        $allPermissions = $buildGroup(1);
        return [
            'all_permissions' => $allPermissions,
        ];
    }
}
