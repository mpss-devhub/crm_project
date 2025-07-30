<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
     public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('user_id', 7)->unique();
            $table->string('role_id');
            $table->string('name', 255);
            $table->string('email', 255)->unique();
            $table->string('phone', 16)->nullable();
            $table->string('password', 8);
            $table->integer('pj_member_id')->nullable();
            $table->string('user_group_id', 7)->nullable();
            $table->string('department', 255)->nullable();
            $table->string('project', 255)->nullable();
            $table->string('created_by', 255)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->string('updated_by', 255)->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('deleted_by', 255)->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
