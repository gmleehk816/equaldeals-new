<?php

namespace Modules\Workspace\app\Http\Controllers\Api\Project;

use App\Http\Controllers\Controller;
use App\Traits\Http\Api\SupportsApiResponses;
use Illuminate\Http\Request;
use Modules\Workspace\app\Models\ProjectGroup;

class ProjectGroupController extends Controller
{
    use SupportsApiResponses;
    
    public $model;
    public function __construct()
    {
        $this->model = ProjectGroup::class;        
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
            'name' => 'required|string|max:255'
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
            'id'          => 'required|integer',
            'name'             => 'required|string|max:255',
        ]);

        $model = $this->model::find($request->id);

        if (!$model) {
            return $this->responseError([
                'message' => 'Record not found.'
            ], 404);
        }

        $data = $request->all();

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

}
