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
        Schema::create('project_member_tickets', function (Blueprint $table) {
            $table->id();
            $table->string('pj_member_id', 7);
            $table->string('ticket_id', 7);
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
        Schema::dropIfExists('project_member_tickets');
    }
};
