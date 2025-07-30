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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_id', 7);
            $table->string('pj_id', 7);
            $table->string('ticket_name', 255);
            $table->string('email', 45);
            $table->text('note')->nullable();
            $table->string('meeting', 45)->nullable();
            $table->unsignedBigInteger('project_id');
            $table->timestamp('created_at')->useCurrent();
            $table->string('updated_by', 45)->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('deleted_by', 45)->nullable();
            $table->softDeletes('deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
