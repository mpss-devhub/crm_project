<?php

namespace App\Dao;

use App\Contracts\Dao\UserGroupDaoInterface;
use App\Models\Usergroup;
use Carbon\Carbon;

class UserGroupDao implements UserGroupDaoInterface
{
    public function getUserGroupList()
    {
        return Usergroup::query()
            ->orderBy('usergp_id', 'DESC')
            ->get([
                'usergp_id',
                'name',
                'system_type',
                'description',
                'permission',
                'created_at'
            ]);
    }

    public function storeUserGroup($validated)
    {
        $lastUserGroup = Usergroup::orderBy('usergp_id', 'desc')->first();

        if ($lastUserGroup) {
            $number = (int) str_replace('Gp', '', $lastUserGroup->usergp_id);
            $userGroupId = 'Gp' . str_pad($number + 1, 5, '0', STR_PAD_LEFT);
        } else {
            $userGroupId = 'Gp00001';
        }
        $userGroup = new Usergroup();
        $userGroup->usergp_id = $userGroupId;
        $userGroup->name = $validated['name'];
        $userGroup->system_type = $validated['system_type'];
        $userGroup->description = $validated['description'];
        $userGroup->permission = $validated['permission'];
        $userGroup->save();

        return $userGroup;
    }

    public function getUserGroupId(Usergroup $usergroup)
    {
        $userGroup = Usergroup::find($usergroup);
        return $userGroup;
    }

    public function updateUserGroupById($validated, Usergroup $usergroup)
    {
        $userGroup = Usergroup::find($usergroup);
        $userGroup->name = $validated['name'];
        $userGroup->system_type = $validated['system_type'];
        $userGroup->description = $validated['description'];
        $userGroup->permission = $validated['permission'];
        $userGroup->save();

        return $userGroup;
    }
    public function deleteUserGroupById(Usergroup $usergroup)
    {
        $usergroup->deleted_at = Carbon::now();
        $usergroup->save();

        return $usergroup;
    }
}
