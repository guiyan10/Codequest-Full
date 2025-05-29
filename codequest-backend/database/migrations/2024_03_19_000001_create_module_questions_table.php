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
        Schema::create('module_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')->constrained('modules')->onDelete('cascade');
            $table->text('question_text');
            $table->enum('question_type', ['multiple_choice', 'true_false', 'open_ended']);
            $table->unsignedInteger('points')->default(1);
            $table->unsignedInteger('order_index');
            $table->timestamps();
        });

        Schema::create('module_question_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained('module_questions')->onDelete('cascade');
            $table->text('option_text');
            $table->boolean('is_correct')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('module_question_options');
        Schema::dropIfExists('module_questions');
    }
}; 