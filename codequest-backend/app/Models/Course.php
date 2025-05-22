<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'difficulty_level',
        'status',
        'language_id',
        'category',
    ];

    protected $casts = [
        'difficulty_level' => 'string',
        'status' => 'string',
        'category' => 'string',
        'language_id' => 'integer',
    ];

    /**
     * Get the language that owns the course.
     */
    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
} 