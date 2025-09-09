<?php

namespace App\Contracts\Services;


interface PermissionServiceInterface
{
    /**
     * To get Permission list
     * @return $pesrmissionList
     */
    public function getPermissionList();

}