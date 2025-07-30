<?php

namespace App\Http\Controllers\UserGroup;

use App\Contracts\Services\UserGroup\UserGroupServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserGroupRequestStore;

class UserGroupController extends Controller
{
    /**
     * userGroup Interface
     */
    private $userGroupInterface;

    /**
     * create userGroup controller instance.
     * 
     * @return void
     */

    public function __construct(UserGroupServiceInterface $userGroupInterface)
    {
        $this->userGroupInterface = $userGroupInterface;
    }

    /**
     * To show userGroup list
     * @return view userGroup list
     */
    public function showUserGroupList()
    {
        $userGroup = $this->userGroupInterface->getUserGroupList();
        return response()->json($userGroup);
    }

    public function sumitCreateUserGroup(UserGroupRequestStore $request)
    {
        $validated = $request->validate();
        $createdUserGroup = $this->userGroupInterface->storeUserGroup($validated);
        return apiResponse(true, 'User Group Create Successfully', $createdUserGroup);
    }
}
