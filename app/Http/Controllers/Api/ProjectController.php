<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $project = Project::all();
        return response()->json(['project', $project], 201);
    }

    /**
     * 
     * 
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'about' => 'required|string',
            'url' => 'required|string|url',
            'image' => 'required | image |max:2048'
        ]);
        if ($request->hasFile('image')) {
            $image = $request['image'];
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
        }
        $project = new Project();
        $project->name = $request['name'];
        $project->about = $request['about'];
        $project->url = $request['url'];
        $project->image = $imageName;
        $project->save();

        return response()->json(['message', 'project added successfuly'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $request->validate([
            'name' => 'string',
            'about' => 'string',
            'url' => 'string',
            'image' => ' image |max:2048'
        ]);
        $imageName = $project['image'];
        if ($request->hasFile('image')) {
            $image = $request['image'];
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
        }
        $project->name = $request['name'];
        $project->about = $request['about'];
        $project->url = $request['url'];
        $project->image = $imageName;
        $project->save();

        return response()->json(['message', 'project updated successfuly'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message', 'project deleted successfuly'], 201);
    }
}
