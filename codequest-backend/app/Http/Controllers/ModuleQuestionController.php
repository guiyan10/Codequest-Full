<?php

namespace App\Http\Controllers;

use App\Models\Modules;
use App\Models\ModuleQuestion;
use App\Models\ModuleQuestionOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ModuleQuestionController extends Controller
{
    /**
     * Store a newly created question in storage.
     */
    public function store(Request $request, Modules $module)
    {
        $validator = Validator::make($request->all(), [
            'question_text' => 'required|string',
            'question_type' => 'required|in:multiple_choice,true_false,open_ended',
            'points' => 'required|integer|min:1',
            'order_index' => 'required|integer|min:0',
            'options' => 'required|array|min:2',
            'options.*.option_text' => 'required|string',
            'options.*.is_correct' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Criar a questão
            $question = ModuleQuestion::create([
                'module_id' => $module->id,
                'question_text' => $request->question_text,
                'question_type' => $request->question_type,
                'points' => $request->points,
                'order_index' => $request->order_index
            ]);

            // Criar as opções
            foreach ($request->options as $option) {
                ModuleQuestionOption::create([
                    'question_id' => $question->id,
                    'option_text' => $option['option_text'],
                    'is_correct' => $option['is_correct']
                ]);
            }

            // Carregar a questão com suas opções
            $question->load('options');

            return response()->json($question, 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar questão',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified question in storage.
     */
    public function update(Request $request, Modules $module, ModuleQuestion $question)
    {
        if ($question->module_id !== $module->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Questão não pertence ao módulo'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'question_text' => 'required|string',
            'question_type' => 'required|in:multiple_choice,true_false,open_ended',
            'points' => 'required|integer|min:1',
            'order_index' => 'required|integer|min:0',
            'options' => 'required|array|min:2',
            'options.*.option_text' => 'required|string',
            'options.*.is_correct' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Atualizar a questão
            $question->update([
                'question_text' => $request->question_text,
                'question_type' => $request->question_type,
                'points' => $request->points,
                'order_index' => $request->order_index
            ]);

            // Remover as opções antigas
            $question->options()->delete();

            // Criar as novas opções
            foreach ($request->options as $option) {
                ModuleQuestionOption::create([
                    'question_id' => $question->id,
                    'option_text' => $option['option_text'],
                    'is_correct' => $option['is_correct']
                ]);
            }

            // Carregar a questão com suas opções
            $question->load('options');

            return response()->json($question);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar questão',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified question from storage.
     */
    public function destroy(Modules $module, ModuleQuestion $question)
    {
        if ($question->module_id !== $module->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Questão não pertence ao módulo'
            ], 404);
        }

        try {
            $question->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao excluir questão',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 