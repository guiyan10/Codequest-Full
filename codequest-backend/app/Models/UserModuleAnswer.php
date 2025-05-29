<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserModuleAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'module_question_id',
        'submitted_answer',
        'is_correct',
    ];

    /**
     * Get the user that submitted the answer.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the module question associated with the answer.
     */
    public function question()
    {
        return $this->belongsTo(ModuleQuestion::class, 'module_question_id');
    }
} 