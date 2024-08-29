<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Social;
use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class SocialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $social = Social::all();
        return response()->json(['social', $social], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);
        $socialData = $request->validate([
            'name' => 'required|string',
            'url' => 'string|url',
        ]);
        $social = new Social();
        $social->create($socialData);
        return response()->json(['message', 'social added successfuly'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Social $social)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Social $social)
    {
        $this->authorize('create', User::class);
        $request->validate([
            'name' => 'required|string',
            'url' => 'required|url',
        ]);
        $social->name = $request['name'];
        $social->url = $request['url'];
        $social->save();
        return response()->json(['message', 'social updated successfuly'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Social $social)
    {
        $social->delete();
        return response()->json(['message', 'social deleted successfuly'], 201);
    }
}
