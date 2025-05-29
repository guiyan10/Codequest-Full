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
        Schema::create('user_module_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('module_question_id')->constrained('module_questions')->onDelete('cascade');
            $table->text('submitted_answer'); // Para armazenar a resposta do usuário
            $table->boolean('is_correct');
            $table->timestamps();

            // Garantir que um usuário só tenha uma resposta por questão por tentativa de módulo (considerando a primeira tentativa que leva à conclusão)
            // Uma abordagem mais robusta para múltiplas tentativas exigiria uma coluna 'attempt_id' ou similar.
            // Por enquanto, assumimos que registramos a resposta da tentativa que levou à conclusão.
            $table->unique(['user_id', 'module_question_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_module_answers');
    }
}; 