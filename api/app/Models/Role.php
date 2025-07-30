<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'role_id',
        'role_name',
        'is_active',
        'created_by',
        'updated_by',
        'deleted_by'
    ];

    protected $hidden = [
        'deleted_at'
    ];

    protected $casts = [
        'is_active' => 'boolean', // Cast to boolean
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    /**
     * Get the users associated with this role
     */
    public function users()
    {
        return $this->hasMany(User::class, 'role_id', 'role_id');
    }
}