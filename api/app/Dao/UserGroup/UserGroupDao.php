<?php

namespace App\Dao\UserGroup;

use App\Contracts\Dao\UserGroup\UserGroupDaoInterface;
use App\Models\Usergroup;
use Carbon\Carbon;

class UserGroupDao implements UserGroupDaoInterface
{
    /**
     * To get userGroupList
     * @return $userGroupList
     */

    public function getUserGroupList()
    {
        $userGroupList = Usergroup::orderBy('usergp_id', 'DESC');
        return $userGroupList;
    }

    /**
     * To store userGroup
     * @param array $validated validated values from userGroup request
     * @return Object $userGroup store user
     */
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

    /**
     * To get userGroup by id
     * @param string Usergroup $usergroup userGroup id
     * @return Object $userGroup userGroup object
     */
    public function getUserGroupId(Usergroup $usergroup) {
        $userGroup = Usergroup::find($usergroup);
        return $userGroup;
    }

    /**
     * To update usergroup by id
     * @param array $validated validated values from usergroup request
     * @param string $id usergroup id
     * @return Object $usergroup usergroup object
     */
    public function updateUserGroupById($validated, Usergroup $usergroup) {
        $userGroup = Usergroup::find($usergroup);
        $userGroup->name = $validated['name'];
        $userGroup->system_type = $validated['system_type'];
        $userGroup->description = $validated['description'];
        $userGroup->permission = $validated['permission'];
        $userGroup->save();

        return $userGroup;
    }

    /**
     * To delete usergroup by id
     * @param string $id usergroup id
     * @param string $deletedusergroupId deleted usergroup id
     */
    public function deleteUserGroupById(Usergroup $usergroup) {
        $userGroup = Usergroup::find($usergroup);
        $userGroup->deleted_at = Carbon::now();
        $userGroup->save();

        return $userGroup;
    }
}
