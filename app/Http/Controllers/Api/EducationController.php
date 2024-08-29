<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Education;
use App\Models\User;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $education = Education::all();
        return response()->json(['education', $education], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $this->authorize('create', User::class);
        $educationData = $request->validate([
            'name' => 'required|string',
            'university' => 'required|string',
            'duration' => 'required|string'
        ]);
        $education = new Education;

        $education->create($educationData);
        return response()->json(['message', 'education added successfuly'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Education $education)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Education $education)
    {
        $this->authorize('create', User::class);
        $request->validate([
            'name' => 'required|string',
            'university' => 'required|string',
            'duration' => 'required|string'
        ]);
        $education->name = $request['name'];
        $education->university = $request['university'];
        $education->duration = $request['duration'];
        $education->save();
        return response()->json(['message', 'education updated successfuly'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Education $education)
    {
        $education->delete();
        return response()->json(['message', 'education deleted successfuly'], 201);
    }
}
