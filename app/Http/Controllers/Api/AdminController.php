<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admin = Admin::all();
        return response()->json(['data', $admin]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dataCreate = $request->validate([
            'name' => 'required |string',
            'job' => 'required|string',
            'email' => 'required|email',
            'number' => 'required|numeric'
        ]);
        $admin = new Admin();
        $admin->create($dataCreate);
        return response()->json(['message', 'created successful']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        $request->validate([
            'name' => 'required |string',
            'job' => 'required|string',
            'email' => 'required|email',
            'number' => 'required|numeric'
        ]);
        $admin->name = $request['name'];
        $admin->job = $request['job'];
        $admin->email = $request['email'];
        $admin->number = $request['number'];
        $admin->save();
        return response()->json(['message', 'updated successful ']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();
        return response()->json(['message', 'deleted successful']);
    }
}
