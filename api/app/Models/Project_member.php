<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class project_member extends Model
{
  protected $fillable = [
        'member_id',
        'member_type',
        'created_by',
        'updated_by',
        'deleted_by'
    ];
}
