<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserGroupController;
use App\Http\Controllers\PermissionController;

Route::post('/usergroupstore', [UserGroupController::class, 'submitCreateUserGroup']);
Route::get('/usergroups', [UserGroupController::class, 'showUserGroupList']);
Route::get('/usergroupedit/{usergroup}', [UserGroupController::class, 'showEditUserGroup']);
Route::put('/usergroupupdate/{usergroup}', [UserGroupController::class, 'submitUpdateUserGroup']);
Route::delete('/usergroupdestroy/{usergroup}', [UserGroupController::class, 'destroyUserGroup']);

Route::get('/permission', [PermissionController::class, 'showPermissionList']);
// super admins
// Route::middleware(['auth:sanctum', 'role:super_admin'])->group(function () {
    
// });

// admins and super admins
// Route::middleware(['auth:sanctum', 'role:super_admin,admin'])->prefix('admin')->group(function () {
    
// });

// user,admin and superadmin
// Route::middleware(['auth:sanctum', 'role:user,admin,super_admin'])->group(function () {});
