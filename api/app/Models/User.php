<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'role_id',
        'name',
        'email',
        'phone',
        'password',
        'pj_members_id',
        'user_group_id',
        'department',
        'project',
        'created_by',
        'updated_by',
        'deleted_by'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the unique identifier for the user (user_id instead of id)
     *
     * @return string
     */
    public function getAuthIdentifierName()
    {
        return 'user_id';
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
    public function usergroup()
    {
        return $this->belongsToMany(UserGroup::class, 'usergp_id');
    }
}
