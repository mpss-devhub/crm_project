<?php

namespace App\Http\Controllers;

use App\Contracts\Services\UserGroupServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserGroupRequestStore;
use App\Models\Usergroup;


class UserGroupController extends Controller
{
    private $userGroupInterface;

    public function __construct(UserGroupServiceInterface $userGroupInterface)
    {
        $this->userGroupInterface = $userGroupInterface;
    }

    public function showUserGroupList()
    {
        $userGroup = $this->userGroupInterface->getUserGroupList();
        return response()->json($userGroup);
    }

    public function submitCreateUserGroup(UserGroupRequestStore $request)
    {
        $validated = $request->validated();
        $createdUserGroup = $this->userGroupInterface->storeUserGroup($validated);
        return apiResponse(true, 'User Group Create Successfully', $createdUserGroup);
    }

    public function showEditUserGroup(Usergroup $usergroup)
    {
        $editUserGroup = $this->userGroupInterface->getUserGroupId($usergroup);
        return response()->json($editUserGroup);
    }

    public function submitUpdateUserGroup(UserGroupRequestStore $request)
    {
        $validated = $request->validated();
        $updateUserGroup = $this->userGroupInterface->storeUserGroup($validated);
        return apiResponse(true, 'User Group Update Successfully', $updateUserGroup);
    }

    public function destroyUserGroup(Usergroup $usergroup)
    {
        $this->userGroupInterface->deleteUserGroupById($usergroup);
        return response()->json([true,
            'message' => 'User Group Deleted Successfully'
        ]);
    }
}
