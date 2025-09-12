<?php

namespace App\Contracts\Services;

use App\Models\Usergroup;

interface UserGroupServiceInterface
{
    public function getUserGroupList();

    public function storeUserGroup($validated);

    public function getUserGroupId(Usergroup $usergroup);

    public function updateUserGroupById($validated, Usergroup $usergroup);

    public function deleteUserGroupById(Usergroup $usergroup);
}
