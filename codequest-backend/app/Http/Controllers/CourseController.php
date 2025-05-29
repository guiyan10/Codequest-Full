<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Modules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class CourseController extends Controller
{
    /**
     * Display a listing of the courses.
     */
    public function index()
    {
        try {
            $user = Auth::user();

            $courses = Course::with(['language', 'modules'])->get();

            $courses = $courses->map(function ($course) use ($user) {
                /** @var \App\Models\User|null $user */
                $totalModules = $course->modules->count();
                $completedModulesCount = 0;

                if ($user) {
                    // Eager load completedModules relation for the user if not already loaded
                    if (!$user->relationLoaded('completedModules')) {
                        $user->load('completedModules');
                    }
                    // Count completed modules for this specific course
                    $completedModulesCount = $user->completedModules->whereIn('module_id', $course->modules->pluck('id'))->count();
                }

                $course->total_modules = $totalModules;
                $course->completed_modules_count = $completedModulesCount;
                $course->progress_percentage = $totalModules > 0 ? round(($completedModulesCount / $totalModules) * 100) : 0;
                
                // Keep the modules relationship for progress calculation
                return $course;
            });

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
     * Get the user's course and module progress.
     */
    public function getUserProgress()
    {
        try {
            /** @var \App\Models\User|null $user */
            $user = Auth::user();

            if (!$user) {
                return response()->json(['message' => 'Não autenticado'], 401);
            }

            // Load completedModules relationship for the user
            $user->load('completedModules');

            $totalCourses = Course::count();
            $completedCoursesCount = 0;
            $totalModules = Modules::count();
            $completedModulesCount = $user->completedModules->count();

            // Calculate completed courses (assuming a course is completed if all its modules are completed)
            $courses = Course::with('modules')->get();
            foreach ($courses as $course) {
                $allModulesCompleted = true;
                if ($course->modules->isEmpty()) {
                    $allModulesCompleted = false; // Consider a course with no modules not completable yet
                } else {
                    foreach ($course->modules as $module) {
                        if (!$user->completedModules->contains('module_id', $module->id)) {
                            $allModulesCompleted = false;
                            break;
                        }
                    }
                }
                if ($allModulesCompleted && !$course->modules->isEmpty()) { // Only count if has modules
                    $completedCoursesCount++;
                }
            }

            return response()->json([
                'status' => 'success',
                'total_courses' => $totalCourses,
                'completed_courses_count' => $completedCoursesCount,
                'total_modules' => $totalModules,
                'completed_modules_count' => $completedModulesCount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar progresso do usuário',
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
     * Get modules for a specific course.
     */
    public function getModules(Course $course)
    {
        $user = Auth::user();

        $modules = $course->modules()->with(['questions.options'])->get();

        // Add completion status for the authenticated user
        $modules = $modules->map(function ($module) use ($user) {
            $isCompleted = false;
            if ($user) {
                // Check directly if a completedModules record exists for this module
                $completedModule = $user->completedModules->firstWhere('module_id', $module->id);
                $isCompleted = (bool) $completedModule;
            }
            $module->is_completed = $isCompleted;
            return $module;
        });

        return response()->json($modules);
    }

    /**
     * Get a single module for a specific course.
     */
    public function getModule(Course $course, Modules $module)
    {
        // Ensure the module belongs to the course
        if ($module->course_id !== $course->id) {
            return response()->json(['message' => 'Module not found in this course'], 404);
        }

        return response()->json($module->load(['questions.options']));
    }

    /**
     * Get user answers for a completed module.
     */
    public function getUserAnswers(Modules $module)
    {
        // ... existing code ...
    }
} 