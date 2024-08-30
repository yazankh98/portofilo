<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skill = Skill::all();
        return response()->json(['skill', $skill], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $skillData = $request->validate([
            'name' => 'required|string',
        ]);
        $skill = new Skill();
        $skill->create($skillData);
        return response()->json(['message', 'Skill added successfuly'],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Skill $skill)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Skill $skill)
    {
        $request->validate([
            'name' => 'required|string'
        ]);
        $skill->name = $request['name'];
        $skill->save();
        return response()->json(['message', 'skill updated successfuly'],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(['message', 'skill deleted successfuly'],201);
    }
}
