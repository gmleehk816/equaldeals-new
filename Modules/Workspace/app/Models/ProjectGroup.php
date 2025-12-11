<?php

namespace Modules\Workspace\app\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectGroup extends Model
{
    protected $table = 'project_group';
    protected $fillable = [
        'project_id','name','position','description','is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $attributes = [
        'is_active' => 1,
    ];
}
