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
    Schema::create('roles', function (Blueprint $table) {
        $table->id();
        $table->string('role_id', 7)->unique();
        $table->string('role_name', 45);
        $table->string('description')->nullable();
        $table->boolean('is_active')->default(true);
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
        Schema::dropIfExists('roles');
    }
};
