<?php

namespace App\Http\Controllers;

use App\Contracts\Services\UserGroupServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserGroupRequestStore;
use App\Models\Usergroup;


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

    /**
     * To submit create usergroup view
     * @param array $validated validated values from usergroup request
     * @return View usergroup list
     */

    public function submitCreateUserGroup(UserGroupRequestStore $request)
    {
        $validated = $request->validated();
        $createdUserGroup = $this->userGroupInterface->storeUserGroup($validated);
        return apiResponse(true, 'User Group Create Successfully', $createdUserGroup);
    }

    /**
     * To show edit usergroup view
     * @param $id usergroup id
     * @return $usergroup
     * @return View edit usergroup view
     */
    public function showEditUserGroup(Usergroup $usergroup)
    {
        $editUserGroup = $this->userGroupInterface->getUserGroupId($usergroup);
        return response()->json($editUserGroup);
    }

    /**
     * To update user group 
     * @param array $validated validated values from user request
     * @return View user list
     */
    public function submitUpdateUserGroup(UserGroupRequestStore $request)
    {
        $validated = $request->validated();
        $updateUserGroup = $this->userGroupInterface->storeUserGroup($validated);
        return apiResponse(true, 'User Group Update Successfully', $updateUserGroup);
    }

    /**
     * To delete usergroup by id
     * @param $id usergroup id 
     * @return View user list
     */

    public function destroyUserGroup(Usergroup $usergroup)
    {
        $this->userGroupInterface->deleteUserGroupById($usergroup);
        return response()->json([true,
            'message' => 'User Group Deleted Successfully'
        ]);
    }
}
