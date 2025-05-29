<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\CompletedModule;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'level',
        'xp',
        'nivel',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'level' => 'integer',
        'xp' => 'integer',
        'nivel' => 'string',
    ];

    /**
     * The attributes that should have default values.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'level' => 1,
        'xp' => 0,
        'nivel' => 'user',
    ];

    /**
     * Get the modules completed by the user.
     */
    public function completedModules()
    {
        return $this->hasMany(CompletedModule::class);
    }

    /**
     * Check if the user has completed a specific module.
     */
    public function hasCompletedModule($moduleId)
    {
        return $this->completedModules()->where('module_id', $moduleId)->exists();
    }
}
