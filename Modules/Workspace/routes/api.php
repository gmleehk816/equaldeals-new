<?php

use Illuminate\Support\Facades\Route;
use Modules\Workspace\App\Http\Controllers\Api\Workspace\WorkspaceController;
use Modules\Workspace\App\Http\Controllers\Api\Project\ProjectController;
use Modules\Workspace\App\Http\Controllers\Api\Workspace\Task\TaskController;

// Test route without auth - public route with throttle


// All workspace routes without auth - public routes with throttle
Route::middleware(['throttle:60,1'])->group(function() {

    Route::get('/workspace/test', function() {
        return response()->json(['message' => 'Workspace API is working!', 'timestamp' => now()]);
    });
    
    Route::prefix('workspace')->group(function() {
        Route::get('/get/all/{user_id}', [WorkspaceController::class, 'index'])->name('workspace.index');
        Route::post('/store', [WorkspaceController::class, 'store'])->name('workspace.store');
        Route::get('/edit/{id}', [WorkspaceController::class, 'edit'])->name('workspace.edit');
        Route::post('/update', [WorkspaceController::class, 'update'])->name('workspace.update');
        Route::delete('/delete/{id}', [WorkspaceController::class, 'delete'])->name('workspace.delete');
    });

    Route::prefix('project')->group(function() {
        Route::get('/get/all/{workspace_id}', [ProjectController::class, 'index'])->name('project.index');
        Route::post('/store', [ProjectController::class, 'store'])->name('project.store');
        Route::get('/edit/{id}', [ProjectController::class, 'edit'])->name('project.edit');
        Route::post('/update', [ProjectController::class, 'update'])->name('project.update');
        Route::delete('/delete/{id}', [ProjectController::class, 'delete'])->name('project.delete');
    });

    Route::prefix('task')->group(function() {
        Route::get('/get/all/{workspace_id}', [TaskController::class, 'index'])->name('task.index');
        Route::post('/store', [TaskController::class, 'store'])->name('task.store');
        Route::get('/edit/{id}', [TaskController::class, 'edit'])->name('task.edit');
        Route::post('/update', [TaskController::class, 'update'])->name('task.update');
        Route::delete('/delete/{id}', [TaskController::class, 'delete'])->name('task.delete');
    });
});



