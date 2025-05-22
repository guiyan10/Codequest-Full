<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\QuizModelController;
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
    Route::apiResource('courses', CourseController::class);
});