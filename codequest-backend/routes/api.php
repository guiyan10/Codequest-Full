<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LanguagesController;
use App\Http\Controllers\QuizModelController;
use App\Http\Controllers\ModulesController;
use App\Http\Controllers\ModuleQuestionController;
use App\Http\Controllers\ModuleAnswerController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rotas de autenticação
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        $user = $request->user();
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'level' => $user->level,
            'xp' => $user->xp,
            'nivel' => $user->nivel,
        ]);
    });
    
    // Rotas do Quiz
    Route::get('/quiz/{id}', [QuizModelController::class, "index"]);
    Route::delete('/quiz/{id}', [QuizModelController::class, "destroy"]);
    Route::post('/quiz', [QuizModelController::class, "create"]);
    Route::put('/quiz/{id}', [QuizModelController::class, "edit"]);

    // Rotas dos Cursos
    Route::prefix('courses')->group(function () {
        Route::get('/user-progress', [CourseController::class, 'getUserProgress']);
        Route::get('/', [CourseController::class, 'index']);
        Route::post('/', [CourseController::class, 'store']);
        Route::get('/{course}', [CourseController::class, 'show']);
        Route::put('/{course}', [CourseController::class, 'update']);
        Route::delete('/{course}', [CourseController::class, 'destroy']);
        Route::get('/{course}/modules', [CourseController::class, 'getModules']);
        Route::get('/{course}/modules/{module}', [CourseController::class, 'getModule']);
    });

    // Rotas das Linguagens
    Route::get('/languages', [LanguagesController::class, 'index']);

    // Rotas dos Módulos
    Route::prefix('modules')->group(function () {
        Route::get('/', [ModulesController::class, 'index']);
        Route::post('/', [ModulesController::class, 'store']);
        Route::get('/{module}', [ModulesController::class, 'show']);
        Route::put('/{module}', [ModulesController::class, 'update']);
        Route::delete('/{module}', [ModulesController::class, 'destroy']);
        
        // Module questions routes
        Route::post('/{module}/questions', [ModuleQuestionController::class, 'store']);
        Route::put('/{module}/questions/{question}', [ModuleQuestionController::class, 'update']);
        Route::delete('/{module}/questions/{question}', [ModuleQuestionController::class, 'destroy']);

        // Module answers routes
        Route::post('/{module}/questions/{question}/answer', [ModuleAnswerController::class, 'submitAnswer']);

        // Module completion route
        Route::post('/{module}/complete', [ModulesController::class, 'complete']);

        // Get user answers for a completed module
        Route::get('/{module}/answers', [ModulesController::class, 'getUserAnswers']);
    });
});