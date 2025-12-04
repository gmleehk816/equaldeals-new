<?php

namespace Modules\Workspace\Models;

use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    protected $table = "tasks";
    protected $fillable = [
        'project_id','board_id','assignee_id','creator_id','title','due_date','priority','status','is_completed','is_active',
        'description'
    ];

     protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $attributes = [
        'is_active' => 1,
    ];
}
