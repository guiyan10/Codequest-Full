<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Modules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    /**
     * Display a listing of the courses.
     */
    public function index()
    {
        try {
            $courses = Course::with('language')->get();
            return response()->json($courses);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar cursos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created course in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'difficulty_level' => 'required|in:easy,medium,hard',
            'status' => 'required|in:draft,active,inactive',
            'language_id' => 'nullable|exists:languages,id',
            'category' => 'required|in:frontend,backend,database,mobile',
        ], [
            'title.required' => 'O título do curso é obrigatório',
            'title.max' => 'O título não pode ter mais de 255 caracteres',
            'description.required' => 'A descrição do curso é obrigatória',
            'difficulty_level.required' => 'O nível de dificuldade é obrigatório',
            'difficulty_level.in' => 'Nível de dificuldade inválido',
            'status.required' => 'O status é obrigatório',
            'status.in' => 'Status inválido',
            'language_id.exists' => 'Linguagem inválida',
            'category.required' => 'A categoria é obrigatória',
            'category.in' => 'Categoria inválida',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $request->all();
            
            // Garante que language_id seja null se não foi fornecido ou está vazio
            if (!isset($data['language_id']) || $data['language_id'] === '') {
                $data['language_id'] = null;
            }
            
            $course = Course::create($data);
            
            // Carrega o relacionamento com language
            $course->load('language');
            
            return response()->json([
                'status' => 'success',
                'message' => 'Curso criado com sucesso',
                'data' => $course
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar curso',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified course.
     */
    public function show(Course $course)
    {
        try {
            return response()->json($course->load('language'));
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar curso',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified course in storage.
     */
    public function update(Request $request, Course $course)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'difficulty_level' => 'sometimes|required|in:easy,medium,hard',
            'status' => 'sometimes|required|in:draft,active,inactive',
            'language_id' => 'nullable|exists:languages,id',
            'category' => 'sometimes|required|in:frontend,backend,database,mobile',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $request->all();
            // Remove language_id se não foi fornecido
            if (!isset($data['language_id']) || empty($data['language_id'])) {
                unset($data['language_id']);
            }
            
            $course->update($data);
            
            // Carrega o relacionamento com language
            $course->load('language');
            
            return response()->json([
                'status' => 'success',
                'message' => 'Curso atualizado com sucesso',
                'data' => $course
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar curso',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified course from storage.
     */
    public function destroy(Course $course)
    {
        try {
            $course->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Curso excluído com sucesso'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao excluir curso',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all modules for a specific course.
     */
    public function getModules(Course $course)
    {
        try {
            $modules = $course->modules()
                ->with(['questions.options'])
                ->orderBy('order_index')
                ->get();
            return response()->json($modules);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar módulos do curso',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific module from a course.
     */
    public function getModule(Course $course, Modules $module)
    {
        try {
            if ($module->course_id !== $course->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Módulo não pertence ao curso'
                ], 404);
            }

            \Log::info('Loading module:', ['module_id' => $module->id]);
            $module->load(['questions.options']);
            \Log::info('Module loaded:', ['module' => $module->toArray()]);
            
            return response()->json($module);
        } catch (\Exception $e) {
            \Log::error('Error loading module:', ['error' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar módulo',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 