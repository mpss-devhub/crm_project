<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(\App\Contracts\Services\UserGroupServiceInterface::class, \App\Services\UserGroupService::class);
        $this->app->bind(\App\Contracts\Dao\UserGroupDaoInterface::class, \App\Dao\UserGroupDao::class);
        $this->app->bind(\App\Contracts\Services\PermissionServiceInterface::class, \App\Services\PermissionService::class);
        $this->app->bind(\App\Contracts\Dao\PermissionDaoInterface::class, \App\Dao\PermissionDao::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
