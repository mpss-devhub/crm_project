<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Usergroup extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $casts = [
        'permission' => 'array', // This will auto-convert between array and JSON
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'usergp_id',
        'name',
        'system_type',
        'description',
        'permission',
        'created_by',
        'updated_by',
        'deleted_by'
    ];

    public function permission()
    {
        return $this->belongsTo(Permission::class, 'permission_id');
    }
}
