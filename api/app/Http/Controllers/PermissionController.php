<?php

namespace App\Http\Controllers;

use App\Contracts\Services\PermissionServiceInterface;
use App\Http\Controllers\Controller;


class PermissionController extends Controller
{
    /**
     * permission Interface
     */
    private $permissionServiceInterface;

    /**
     * create permission controller instance.
     * 
     * @return void
     */

    public function __construct(PermissionServiceInterface $permissionServiceInterface)
    {
        $this->permissionServiceInterface = $permissionServiceInterface;
    }

    /**
     * To show permission list
     * @return view permission list
     */
    public function showPermissionList()
    {
        $permission = $this->permissionServiceInterface->getPermissionList();
        return response()->json($permission);
    }
}