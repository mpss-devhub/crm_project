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
        $this->app->bind(\App\Contracts\Services\UserGroup\UserGroupServiceInterface::class, \App\Services\UserGroup\UserGroupService::class);
        $this->app->bind(\App\Contracts\Dao\UserGroup\UserGroupDaoInterface::class, \App\Dao\UserGroup\UserGroupDao::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
