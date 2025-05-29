<?php

namespace App\Http\Controllers;

use App\Models\Modules;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\UserModuleAnswer;

class ModulesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $modules = Modules::with(['course', 'questions.options'])->get();
        return response()->json($modules);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'order_index' => 'required|integer',
            'duration' => 'required|string',
            'xp' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $module = Modules::create([
            'course_id' => $request->course_id,
            'title' => $request->title,
            'description' => $request->description,
            'content' => $request->content,
            'order_index' => $request->order_index,
            'duration' => $request->duration,
            'xp' => $request->xp
        ]);

        return response()->json($module->load(['course', 'questions.options']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Modules $module)
    {
        return response()->json($module->load(['course', 'questions.options']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Modules $modules)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Modules $module)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'exists:courses,id',
            'title' => 'string|max:255',
            'description' => 'string',
            'content' => 'string',
            'order_index' => 'integer',
            'duration' => 'string',
            'xp' => 'integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $module->update([
            'course_id' => $request->course_id ?? $module->course_id,
            'title' => $request->title ?? $module->title,
            'description' => $request->description ?? $module->description,
            'content' => $request->content ?? $module->content,
            'order_index' => $request->order_index ?? $module->order_index,
            'duration' => $request->duration ?? $module->duration,
            'xp' => $request->xp ?? $module->xp
        ]);

        return response()->json($module->load(['course', 'questions.options']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Modules $module)
    {
        $module->delete();
        return response()->json(null, 204);
    }

    /**
     * Complete a module and award XP to the user.
     */
    public function complete(Request $request, Modules $module)
    {
        $validator = Validator::make($request->all(), [
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:module_questions,id',
            'answers.*.answer' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            /** @var \App\Models\User $user */
            $user = Auth::user();

            // Verificar se o usuário já completou este módulo
            $completedModule = $user->completedModules()->where('module_id', $module->id)->first();

            if ($completedModule) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Você já completou este módulo'
                ], 400);
            }

            // Registrar o módulo como completo para o usuário
            $user->completedModules()->create([
                'module_id' => $module->id,
                'completed_at' => now()
            ]);

            // Adicionar XP ao usuário
            $user->xp += $module->xp;

            // Verificar se o usuário subiu de nível
            $newLevel = floor($user->xp / 1000) + 1; // Cada nível requer 1000 XP
            if ($newLevel > $user->level) {
                $user->level = $newLevel;
            }

            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Módulo completado com sucesso!',
                'xp_earned' => $module->xp,
                'total_xp' => $user->xp,
                'current_level' => $user->level
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao completar módulo',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user answers for a completed module.
     */
    public function getUserAnswers(Modules $module)
    {
        try {
            /** @var \App\Models\User $user */
            $user = Auth::user();

            if (!$user) {
                 return response()->json(['message' => 'Não autenticado'], 401);
            }

            // Verificar se o usuário completou o módulo
            if (!$user->hasCompletedModule($module->id)) {
                 return response()->json(['message' => 'Módulo não completado por este usuário'], 403);
            }

            // Load the questions relationship
            $module->load('questions.options');

            // Get question IDs, ensure questions exist
            $questionIds = $module->questions ? $module->questions->pluck('id') : collect();

            // Buscar as respostas do usuário para as questões deste módulo
            // Ensure there are question IDs before querying user_module_answers
            $userAnswers = $questionIds->isEmpty() ? collect() : UserModuleAnswer::where('user_id', $user->id)
                ->whereIn('module_question_id', $questionIds)
                ->with('question.options') // Carregar as opções da questão
                ->get();

            // Formatar os resultados para incluir a resposta correta e explicação
            $formattedAnswers = $userAnswers->map(function ($userAnswer) use ($module) {
                // Safely find the correct option
                $correctOption = null;
                $optionsData = [];
                $questionText = 'Questão não encontrada';
                $explanationText = null;

                if ($userAnswer->question) {
                    $questionText = $userAnswer->question->question_text;
                    $explanationText = $userAnswer->question->explanation; // Get the explanation

                    if ($userAnswer->question->options) {
                         $correctOption = $userAnswer->question->options->where('is_correct', true)->first();

                         $optionsData = $userAnswer->question->options->map(function($option) {
                            return [
                                'id' => $option->id,
                                'option_text' => $option->option_text,
                            ];
                        })->toArray();
                    }
                }

                return [
                    'module_question_id' => $userAnswer->module_question_id,
                    'question_text' => $questionText,
                    'submitted_answer' => $userAnswer->submitted_answer,
                    'is_correct' => $userAnswer->is_correct,
                    'correct_answer' => $correctOption ? $correctOption->option_text : null,
                    'options' => $optionsData,
                    'explanation' => $explanationText, // Include the explanation
                ];
            });

            return response()->json($formattedAnswers);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar respostas do usuário',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
