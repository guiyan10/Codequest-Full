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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('difficulty_level', ['easy', 'medium', 'hard']);
            $table->enum('status', ['draft', 'active', 'inactive'])->default('draft');
            $table->foreignId('language_id')->nullable()->constrained('languages')->onDelete('set null');
            $table->enum('category', ['frontend', 'backend', 'database', 'mobile']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
}; 