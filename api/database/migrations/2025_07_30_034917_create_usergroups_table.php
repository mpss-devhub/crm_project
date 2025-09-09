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
        Schema::create('usergroups', function (Blueprint $table) {
            $table->id();
            $table->string('usergp_id', 7)->unique();
            $table->string('name', 255);
            $table->enum('system_type', ['Admin', 'User', 'Guest'])->default('User');
            $table->string('description', 255)->nullable();
            $table->text('permission',500);
            $table->string('created_by', 255)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->string('updated_by', 255)->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('deleted_by', 255)->nullable();
            $table->softDeletes();
            $table->index('system_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usergroups');
    }
};
