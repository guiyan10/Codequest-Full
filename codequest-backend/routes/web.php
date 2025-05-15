<?php

use App\Http\Controllers\QuizModelController;
use App\Models\QuizModel;
use Illuminate\Support\Facades\Route;

Route::get('/', [QuizModelController::class, "index"]);
Route::delete('/quiz/{id}', [QuizModelController::class, "destroy"])->name('quiz.delete');
Route::post('/quiz', [QuizModelController::class, "create"])->name('quiz.create');
Route::put('/quiz/{id}', [QuizModelController::class, "edit"])->name('caueex');
Route::post('/login', [AuthController::class, "login"])->name('login');