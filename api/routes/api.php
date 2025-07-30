<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserGroup\UserGroupController;
// Route::get('/', function () {
//     return apiResponse(true, 'User Group Create Successfully', null);
// });
Route::post('/usergroups', [UserGroupController::class, 'sumitCreateUserGroup']);
Route::get('/usergroups', [UserGroupController::class, 'showUserGroupList']);

// super admins
// Route::middleware(['auth:sanctum', 'role:super_admin'])->group(function () {
    
// });

// admins and super admins
// Route::middleware(['auth:sanctum', 'role:super_admin,admin'])->prefix('admin')->group(function () {
    
// });

// user,admin and superadmin
// Route::middleware(['auth:sanctum', 'role:user,admin,super_admin'])->group(function () {});
