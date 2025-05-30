<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Questions extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionsFactory> */
    use HasFactory;

    protected $fillable = [
        'module_id',
        'question_text',
        'question_type',
        'points',
        'order_index'
    ];

    public function module(): BelongsTo
    {
        return $this->belongsTo(Modules::class, 'module_id');
    }

    public function answerOptions(): HasMany
    {
        return $this->hasMany(AnswerOptions::class, 'question_id');
    }
}
