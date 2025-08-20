<?php

namespace App\Services;

use App\Contracts\Services\UserGroupServiceInterface;
use App\Contracts\Dao\UserGroupDaoInterface;
use App\Models\Usergroup;

class UserGroupService implements UserGroupServiceInterface
{
    /**
     * usergroup dao
     */

    private $userGroupDao;

    /**
     * @param UserGroupDaoInterface
     * @return
     */

    public function __construct(UserGroupDaoInterface $userGroupDao)
    {
        $this->userGroupDao = $userGroupDao;
    }

    /**
     * To get userGroupList
     * @return $userGroupList
     */

    public function getUserGroupList()
    {
        return $this->userGroupDao->getUserGroupList();
    }

    /**
     * To store userGroup
     * @param array $validated validated values from userGroup request
     * @return Object $userGroup store user
     */
    public function storeUserGroup($validated)
    {
        return $this->userGroupDao->storeUserGroup($validated);
    }

     /**
     * To get userGroup by id
     * @param string Usergroup $usergroup userGroup id
     * @return Object $userGroup userGroup object
     */
    public function getUserGroupId(Usergroup $usergroup)
    {   
        return $this->userGroupDao->getUserGroupId($usergroup);
    }

    /**
     * To update usergroup by id
     * @param array $validated validated values from usergroup request
     * @param string $id usergroup id
     * @return Object $usergroup usergroup object
     */
    public function updateUserGroupById($validated,Usergroup $usergroup)
    {
        return $this->userGroupDao->updateUserGroupById($validated,$usergroup);
    }

    /**
     * To delete usergroup by id
     * @param string $id usergroup id
     * @param string $deletedusergroupId deleted usergroup id
     */
    public function deleteUserGroupById(Usergroup $usergroup)
    {
        return $this->userGroupDao->deleteUserGroupById($usergroup);
    }

}