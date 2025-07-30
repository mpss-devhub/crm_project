<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PHPUnit\Framework\Attributes\Ticket;

class project_member_ticket extends Model
{
     protected $fillable = [
        'pj_member_id',
        'ticket_id',
        'created_by',
        'updated_by',
        'deleted_by'
    ];

     public function pj_member_id()
    {
        return $this->belongsToMany(project_member::class, 'pj_member_id'); // if many-to-many
    }
    public function ticket_id()
    {
        return $this->belongsToMany(Ticket::class, 'ticket_id');
    }
}
