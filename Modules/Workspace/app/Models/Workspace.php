<?php

namespace Modules\Workspace\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Workspace\Database\Factories\WorkspaceFactory;

class Workspace extends Model
{
    use HasFactory;

     protected $table = 'workspaces';
    protected $fillable = [
        'user_id','name','visibility_scope','description','is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $attributes = [
        'is_active' => 1,
    ];
}
