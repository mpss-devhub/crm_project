<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class project extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'pj_id',
        'pj_name',
        'pj_member_id',
        'company',
        'created_by',
        'updated_by',
        'deleted_by'
    ];

     public function project_member()
    {
        return $this->belongsToMany(Project_member::class, 'pj_member_id'); // if many-to-many
    }
}
