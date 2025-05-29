<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompletedModule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'module_id',
        'completed_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'completed_at' => 'datetime'
    ];

    /**
     * Get the user that completed the module.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the module that was completed.
     */
    public function module()
    {
        return $this->belongsTo(Modules::class, 'module_id');
    }
} 