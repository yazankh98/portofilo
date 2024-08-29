<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use App\Models\User;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $experience = Experience::all();
        return response()->json(['experience', $experience],201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $this->authorize('create', User::class);
        $experienceData = $request->validate([
            'name' => 'required|string',
            'company' => 'required|string',
            'duration' => 'required|string'
        ]);
        $experience = new Experience();
        $experience->create($experienceData);
        return response()->json(['message', 'Experience added successfuly'],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Experience $experience)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Experience $experience)
    {
        $this->authorize('create', User::class);
        $request->validate([
            'name' => 'required|string',
            'company' => 'required|string',
            'duration' => 'required|string'
        ]);
        $experience->name = $request['name'];
        $experience->company = $request['company'];
        $experience->duration = $request['duration'];
        $experience->save();
        return response()->json(['message', 'experience updated successfuly'],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Experience $experience)
    {
        $experience->delete();
        return response()->json(['message', 'experience deleted successfuly'],201);
    }
}
