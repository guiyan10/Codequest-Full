<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Language extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'icon',
        'color',
        'image'
    ];

    /**
     * Get the courses for the language.
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
} 