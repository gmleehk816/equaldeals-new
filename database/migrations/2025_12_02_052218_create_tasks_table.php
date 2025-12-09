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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id')->nullable();
            $table->integer('board_id')->nullable();
            $table->integer('assignee_id')->nullable();
            $table->integer('creator_id')->nullable();
            $table->string('title')->nullable();
            $table->string('due_date')->nullable();
            $table->string('priority')->nullable();
            $table->string('status')->nullable();
            $table->boolean('is_completed')->nullable();
            $table->boolean('is_active')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
