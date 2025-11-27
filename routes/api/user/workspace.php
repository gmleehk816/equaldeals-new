<?php
use App\Http\Controllers\Api\User\Workspace\WorkspaceController;
use Illuminate\Support\Facades\Route;
Route::prefix('workspace')->group(function() {
    Route::get('/get', [WorkspaceController::class, 'getUserWorkspaces'])->name('workspace.get');
});