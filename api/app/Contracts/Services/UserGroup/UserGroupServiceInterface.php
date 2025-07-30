<?php

namespace App\Contracts\Services\UserGroup;

use App\Models\Usergroup;

interface UserGroupServiceInterface
{
    /**
     * To get usergroup list
     * @return $userList
     */
    public function getUserGroupList();

    /**
     * To store usergroup
     * @param array $validated validated values from usergroup request
     * @return Object $usergroup store usergroup
     */
    public function storeUserGroup($validated);

    /**
     * To get usergroup by id
     * @param string $id usergroup id
     */

    public function getUserGroupId(Usergroup $usergroup);

    /**
     * To update usergroup by id
     * @param array $validated validated values from usergroup request
     * @param string $id usergroup id
     * @return Object $usergroup usergroup object
     */
    public function updateUserGroupById($validated, Usergroup $usergroup);

    /**
     * To delete usergroup by id
     * @param string $id usergroup id
     * @param string $deletedusergroupId deleted usergroup id
     */
    public function deleteUserGroupById(Usergroup $usergroup);
}
