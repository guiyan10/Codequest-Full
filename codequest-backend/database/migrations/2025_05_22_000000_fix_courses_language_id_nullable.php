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
        Schema::table('courses', function (Blueprint $table) {
            // Primeiro removemos a foreign key existente
            $table->dropForeign(['language_id']);
            
            // Depois modificamos a coluna para ser nullable
            $table->foreignId('language_id')->nullable()->change();
            
            // Por fim, adicionamos a foreign key novamente
            $table->foreign('language_id')->references('id')->on('languages')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            // Primeiro removemos a foreign key
            $table->dropForeign(['language_id']);
            
            // Depois modificamos a coluna para não ser nullable
            $table->foreignId('language_id')->nullable(false)->change();
            
            // Por fim, adicionamos a foreign key novamente
            $table->foreign('language_id')->references('id')->on('languages')->onDelete('cascade');
        });
    }
}; 