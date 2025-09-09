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
    public function getPermissionList(){
        return Permission::query()
        ->select('name', 'group')
        ->get()
        ->groupBy('group')
        ->map(function ($permissions) {
            return $permissions->pluck('name');
        });
    }
}