<?php

namespace App\Contracts\Dao;

interface PermissionDaoInterface
{
    /**
     * To get Permission list
     * @return $PermissionList
     */
    public function getPermissionList();
}
