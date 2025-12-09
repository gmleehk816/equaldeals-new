<?php

namespace Modules\Workspace\App\Http\Controllers\Api\Task;

use App\Http\Controllers\Controller;
use App\Traits\Http\Api\SupportsApiResponses;
use Illuminate\Http\Request;
use Modules\Workspace\App\Models\Tasks;

class TaskController extends Controller
{
    use SupportsApiResponses;
    
    public $model;
    public function __construct()
    {
        $this->model = Tasks::class;        
    }

    public function index($project_id)
    {    
        $model = $this->model::where('project_id', $project_id)->get();
        return $this->responseSuccess([
            'data' => $model,
        ]);
    }
    public function store(Request $request)
    {  
        $request->validate([
            'project_id' => 'required|integer',
            'title' => 'required|string|max:255',
            'due_date' => 'required|string',
             'status' => 'required|string',
            'description' => 'nullable|string',
        ]);
        $data = $request->all();
        if($model = $this->model::create($data)){
             return $this->responseSuccess([
                'data' => $model,
            ],200);
        }else{
            return $this->responseError([
                'message'=>'Record creation failed'
            ], 500);
        }
        
    }
    public function edit($id)
    {    
        $model = $this->model::find($id);
        
        return $this->responseSuccess([
            'data' => $model,
        ]);
    }
    public function update(Request $request)
    {
        
        $request->validate([
            'edit_id'          => 'required',
            'title'             => 'nullable|string|max:255',
            'due_date' => 'nullable|string',
            'status' => 'nullable|string',
            'description'      => 'nullable|string',
        ]);

        $model = $this->model::find($request->edit_id);
        if (!$model) {
            return $this->responseError([
                'message' => 'Record not found.'
            ], 404);
        }

        $data = $request->only([
            'title',
            'due_date',
            'status',
            'description'
        ]);

        if($model->update($data)){
            return $this->responseSuccess([
                'data' => $model,
            ], 200);
        }else{
            return $this->responseError([
                'message'=>'Record update failed'
            ], 500);
        }
        
    }
    public function delete($id)
    {
        $model = $this->model::find($id);

        if (!$model) {
            return $this->responseError([
                'message' => 'Record not found.'
            ], 404);
        }

        if($model->delete()){
            return $this->responseSuccess([
                'message'=>'Record deleted successfully'
            ], 200);
        }else{
            return $this->responseError([
                'message'=>'Record deletion failed'
            ], 500);
        }
        
    }
    public function taskAssignee($task_id, $assignee_id)
    {
        
        $model = $this->model::find($task_id);
        if (!$model) {
            return $this->responseError([
                'message' => 'Record not found.'
            ], 404);
        }            
    
        $model->assignee_id = $assignee_id;
        if($model->save()){
            return $this->responseSuccess([
                'data' => $model,
            ]);
        }
    
    }
    public function taskPriority($task_id, $priority_id)
    {
        
        $model = $this->model::find($task_id);
        if (!$model) {
            return $this->responseError([
                'message' => 'Record not found.'
            ], 404);
        }            
    
        $model->priority = $priority_id;
        if($model->save()){
            return $this->responseSuccess([
                'data' => $model,
            ]);
        }
    
    }
    public function taskStatus(Request $request)
    {
        
        $model = $this->model::where('project_id',$request->project_id)->where('status',$request->status)->get();
        if (!$model) {
            return $this->responseError([
                'message' => 'Record not found.'
            ], 404);
        }            
        if($model){
            return $this->responseSuccess([
                'data' => $model,
            ]);
        }
    
    }
}