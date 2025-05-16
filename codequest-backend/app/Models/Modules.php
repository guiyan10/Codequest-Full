<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modules extends Model
{
    /** @use HasFactory<\Database\Factories\ModulesFactory> */
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'description',
        'order_index'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
