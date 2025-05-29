<?php

namespace App\Http\Controllers;

use App\Models\Modules;
use App\Models\ModuleQuestion;
use App\Models\ModuleQuestionOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ModuleAnswerController extends Controller
{
    /**
     * Submit an answer for a question.
     */
    public function submitAnswer(Request $request, Modules $module, ModuleQuestion $question)
    {
        $validator = Validator::make($request->all(), [
            'answer' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Verificar se a questão pertence ao módulo
            if ($question->module_id !== $module->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Questão não pertence ao módulo'
                ], 404);
            }

            // Encontrar a opção correta
            $correctOption = $question->options()->where('is_correct', true)->first();

            if (!$correctOption) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Questão não possui uma resposta correta definida'
                ], 500);
            }

            // Verificar se a resposta está correta
            $isCorrect = $request->answer === $correctOption->option_text;

            return response()->json([
                'status' => 'success',
                'is_correct' => $isCorrect,
                'correct_answer' => $correctOption->option_text,
                'points' => $isCorrect ? $question->points : 0
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao verificar resposta',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 