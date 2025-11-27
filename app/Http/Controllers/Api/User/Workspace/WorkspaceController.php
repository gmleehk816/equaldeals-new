<?php

namespace App\Http\Controllers\Api\User\Workspace;

use App\Http\Controllers\Controller;
use App\Traits\Http\Api\SupportsApiResponses;
use Illuminate\Http\Request;
use App\Models\Workspace;

class WorkspaceController extends Controller
{
    use SupportsApiResponses;
    
    public $model;
    public function __construct()
    {
        $this->model = Workspace::class;        
    }

    public function index($user_id)
    {    
        $workspaces = $this->model::where('user_id', $user_id)->get();
        return $this->responseSuccess([
            'data' => $workspaces,
        ]);
    }
    public function store(Request $request)
    {  
        $request->validate([
            'user_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'visibility_scope' => 'required|string',
            'description' => 'nullable|string',
        ]);
        $data = $request->all();
        if($workspace = $this->model::create($data)){
             return $this->responseSuccess([
                'data' => $workspace,
            ],200);
        }else{
            return $this->responseError([
                'message'=>'Record creation failed'
            ], 500);
        }
        
    }
    public function edit($id)
    {    
        $workspace = $this->model::find($id);
        
        return $this->responseSuccess([
            'data' => $workspace,
        ]);
    }
    public function update(Request $request)
    {
        $request->validate([
            'edit_id'          => 'required|integer',
            'name'             => 'required|string|max:255',
            'visibility_scope' => 'required|string',
            'description'      => 'nullable|string',
        ]);

        $workspace = $this->model::find($request->edit_id);

        if (!$workspace) {
            return $this->responseError([
                'message' => 'Record not found.'
            ], 404);
        }

        $data = $request->only([
            'name',
            'visibility_scope',
            'description'
        ]);

        if($workspace->update($data)){
            return $this->responseSuccess([
                'data' => $workspace,
            ], 200);
        }else{
            return $this->responseError([
                'message'=>'Record update failed'
            ], 500);
        }
        
    }
    public function delete($id)
    {
        $workspace = $this->model::find($id);

        if (!$workspace) {
            return $this->responseError([
                'message' => 'Record not found.'
            ], 404);
        }

        if($workspace->delete()){
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
