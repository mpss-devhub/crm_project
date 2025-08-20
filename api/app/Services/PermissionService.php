<?php

namespace App\Services;

use App\Contracts\Dao\PermissionDaoInterface;
use App\Contracts\Services\PermissionServiceInterface;

class PermissionService implements PermissionServiceInterface
{
    /**
     * Permision dao
     */

    private $permissionDao;

    /**
     * @param PermissionDaoInterface
     * @return
     */

    public function __construct(PermissionDaoInterface $PermissionDao)
    {
        $this->permissionDao = $PermissionDao;
    }

    /**
     * To get PermissionList
     * @return $PermissionList
     */

    public function getPermissionList()
    {
        return $this->permissionDao->getPermissionList();
    }
}