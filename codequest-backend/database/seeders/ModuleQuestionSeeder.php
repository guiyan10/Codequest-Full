<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Modules;
use App\Models\ModuleQuestion;
use App\Models\ModuleQuestionOption;

class ModuleQuestionSeeder extends Seeder
{
    public function run(): void
    {
        // Criar algumas questões para o módulo 1
        $module = Modules::find(1);
        if ($module) {
            // Questão 1
            $question1 = ModuleQuestion::create([
                'module_id' => $module->id,
                'question_text' => 'O que é HTML?',
                'question_type' => 'multiple_choice',
                'points' => 1,
                'order_index' => 1
            ]);

            ModuleQuestionOption::create([
                'question_id' => $question1->id,
                'option_text' => 'Uma linguagem de programação',
                'is_correct' => false
            ]);

            ModuleQuestionOption::create([
                'question_id' => $question1->id,
                'option_text' => 'Uma linguagem de marcação',
                'is_correct' => true
            ]);

            ModuleQuestionOption::create([
                'question_id' => $question1->id,
                'option_text' => 'Um framework JavaScript',
                'is_correct' => false
            ]);

            // Questão 2
            $question2 = ModuleQuestion::create([
                'module_id' => $module->id,
                'question_text' => 'Qual tag HTML é usada para criar um link?',
                'question_type' => 'multiple_choice',
                'points' => 1,
                'order_index' => 2
            ]);

            ModuleQuestionOption::create([
                'question_id' => $question2->id,
                'option_text' => '<link>',
                'is_correct' => false
            ]);

            ModuleQuestionOption::create([
                'question_id' => $question2->id,
                'option_text' => '<a>',
                'is_correct' => true
            ]);

            ModuleQuestionOption::create([
                'question_id' => $question2->id,
                'option_text' => '<href>',
                'is_correct' => false
            ]);
        }
    }
} 