<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ModuleQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'question_text',
        'question_type',
        'points',
        'order_index',
        'explanation',
    ];

    public function module(): BelongsTo
    {
        return $this->belongsTo(Modules::class, 'module_id');
    }

    public function options(): HasMany
    {
        return $this->hasMany(ModuleQuestionOption::class, 'question_id');
    }
} 