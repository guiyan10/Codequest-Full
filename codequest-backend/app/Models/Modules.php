<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Modules extends Model
{
    /** @use HasFactory<\Database\Factories\ModulesFactory> */
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'description',
        'content',
        'order_index',
        'duration',
        'xp'
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(ModuleQuestion::class, 'module_id')->orderBy('order_index');
    }
}
