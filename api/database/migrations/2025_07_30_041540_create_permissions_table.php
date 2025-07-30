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
         Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('permission_id', 7)->unique();
            $table->string('name', 255);
            $table->string('label', 255);
            $table->string('group', 50);
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('created_by', 255)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->string('updated_by', 255)->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('deleted_by', 255)->nullable();
            $table->softDeletes();
            $table->index('name');
            $table->index('group');
            $table->foreign('parent_id')
                  ->references('id')
                  ->on('permissions')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
