<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizModel extends Model
{
    protected $table = 'quiz';
    protected $fillable = [
        'id',
        'created_at',
        'updated_at',
        'name',
        'description',
        
    ];
}
