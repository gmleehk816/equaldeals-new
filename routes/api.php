<?php
/*
|--------------------------------------------------------------------------
| ColibriPlus - The Ultimate Social Network Web Application.
|--------------------------------------------------------------------------
| Author: Mansur Terla. Full-Stack Web Developer, UI/UX Designer.
| Website: www.terla.me
| E-mail: mansurtl.contact@gmail.com
| Instagram: @mansur_terla
| Telegram: @mansurtl_contact
|--------------------------------------------------------------------------
| Copyright (c)  ColibriPlus. All rights reserved.
|--------------------------------------------------------------------------
*/

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

// Workspace module routes (public)
use Modules\Workspace\app\Http\Controllers\Api\Workspace\WorkspaceController;
use Modules\Workspace\app\Http\Controllers\Api\Project\ProjectController;
use Modules\Workspace\app\Http\Controllers\Api\Project\ProjectGroupController;
use Modules\Workspace\app\Http\Controllers\Api\Task\TaskController;


// Workspace module API routes (public) - CORS handled globally in bootstrap/app.php
Route::middleware(['throttle:60,1'])->group(function() {
    
    Route::prefix('workspace')->group(function() {

        Route::get('/get/all/{user_id}', [WorkspaceController::class, 'index'])->name('api.workspace.index');
        Route::post('/store', [WorkspaceController::class, 'store'])->name('api.workspace.store');
        Route::get('/edit/{id}', [WorkspaceController::class, 'edit'])->name('api.workspace.edit');
        Route::post('/update', [WorkspaceController::class, 'update'])->name('api.workspace.update');
        Route::delete('/delete/{id}', [WorkspaceController::class, 'delete'])->name('api.workspace.delete');
    });

    Route::prefix('project')->group(function() {
        Route::get('/get/all/{workspace_id}', [ProjectController::class, 'index'])->name('api.project.index');
        Route::post('/store', [ProjectController::class, 'store'])->name('api.project.store');
        Route::get('/edit/{id}', [ProjectController::class, 'edit'])->name('api.project.edit');
        Route::get('/by/{project_id}', [ProjectController::class, 'getProjectById']);
        Route::post('/update', [ProjectController::class, 'update'])->name('api.project.update');
        Route::delete('/delete/{id}', [ProjectController::class, 'delete'])->name('api.project.delete');
    });

    Route::prefix('project/group')->group(function() {
        Route::get('/get/all/{project_id}', [ProjectGroupController::class, 'index']);
        Route::post('/store', [ProjectGroupController::class, 'store']);
        Route::get('/edit/{id}', [ProjectGroupController::class, 'edit']);
        Route::post('/update', [ProjectGroupController::class, 'update']);
        Route::delete('/delete/{id}', [ProjectGroupController::class, 'delete']);
    });

    Route::prefix('task')->group(function() {
        Route::get('/get/all/{project_id}/{group_id}', [TaskController::class, 'index'])->name('api.task.index');
        Route::post('/store', [TaskController::class, 'store'])->name('api.task.store');
        Route::get('/edit/{id}', [TaskController::class, 'edit'])->name('api.task.edit');
        Route::post('/update', [TaskController::class, 'update'])->name('api.task.update');
        Route::delete('/delete/{id}', [TaskController::class, 'delete'])->name('api.task.delete');
        Route::post('/assignee/{task_id}/{assignee_id}', [TaskController::class, 'taskAssignee']);
        Route::post('/priority/{task_id}/{priority_id}', [TaskController::class, 'taskPriority']);
        Route::get('/status', [TaskController::class, 'taskStatus']);
    });
});

Route::post('/sanctum/token', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required',
    ]);
 
    $user = User::where('email', $request->email)->first();
 
    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }
 
    return $user->createToken($request->device_name)->plainTextToken;
});

Route::prefix('translations')->middleware(['throttle:60,1'])->group(base_path('routes/api/translations.php'));

Route::prefix('bootstrap')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/bootstrap.php'));

Route::prefix('settings')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/account_settings.php'));

Route::prefix('auth')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/auth.php'));

Route::prefix('post/editor')->middleware(['auth:sanctum', 'throttle:240,1'])->group(base_path('routes/api/user/post_editor.php'));

Route::prefix('story/editor')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/story_editor.php'));

Route::prefix('timeline')->middleware(['auth:sanctum', 'throttle:240,1'])->group(base_path('routes/api/user/timeline.php'));

Route::prefix('stories')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/stories.php'));

Route::prefix('profile')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/profile.php'));

Route::prefix('follows')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/follows.php'));

Route::prefix('marketplace')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/marketplace.php'));

Route::prefix('jobs')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/jobs.php'));

Route::prefix('messenger')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/messenger.php'));

Route::prefix('admin')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/admin.php'));

Route::prefix('recommendations')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/recommend.php'));

Route::prefix('explore')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/explore.php'));

Route::prefix('notifications')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/notifications.php'));

Route::prefix('autocompletes')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/autocompletes.php'));

Route::prefix('translator')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/translator.php'));

Route::prefix('feedback')->middleware(['auth:sanctum', 'throttle:15,1'])->group(base_path('routes/api/user/feedback.php'));

Route::prefix('bookmarks')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/bookmarks.php'));

Route::prefix('wallet')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/wallet.php'));

Route::prefix('system')->middleware(['throttle:60,1'])->group(base_path('routes/api/system/master.php'));

Route::prefix('ads')->middleware(['throttle:60,1'])->group(base_path('routes/api/ads/ad.php'));

Route::prefix('tips')->middleware(['auth:sanctum', 'throttle:60,1'])->group(base_path('routes/api/user/tips.php'));