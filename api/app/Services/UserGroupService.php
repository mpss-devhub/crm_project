<?php

namespace App\Services;

use App\Contracts\Services\UserGroupServiceInterface;
use App\Contracts\Dao\UserGroupDaoInterface;
use App\Models\Usergroup;

class UserGroupService implements UserGroupServiceInterface
{
    private $userGroupDao;

    public function __construct(UserGroupDaoInterface $userGroupDao)
    {
        $this->userGroupDao = $userGroupDao;
    }
    public function getUserGroupList()
    {
        return $this->userGroupDao->getUserGroupList();
    }

    public function storeUserGroup($validated)
    {
        return $this->userGroupDao->storeUserGroup($validated);
    }

    public function getUserGroupId(Usergroup $usergroup)
    {   
        return $this->userGroupDao->getUserGroupId($usergroup);
    }

    public function updateUserGroupById($validated,Usergroup $usergroup)
    {
        return $this->userGroupDao->updateUserGroupById($validated,$usergroup);
    }

    public function deleteUserGroupById(Usergroup $usergroup)
    {
        return $this->userGroupDao->deleteUserGroupById($usergroup);
    }

}