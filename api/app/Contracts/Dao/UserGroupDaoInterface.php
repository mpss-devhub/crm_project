<?php

namespace App\Contracts\Dao;

use App\Models\Usergroup;

interface UserGroupDaoInterface
{
    public function getUserGroupList();

    public function storeUserGroup($validated);

    public function getUserGroupId(Usergroup $usergroup);

    public function updateUserGroupById($validated, Usergroup $usergroup);

    public function deleteUserGroupById(Usergroup $usergroup);
}
