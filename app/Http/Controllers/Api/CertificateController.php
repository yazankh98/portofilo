<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\User;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certificate = Certificate::all();
        return response()->json(['Certificate', $certificate],201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $certificateData = $request->validate([
            'name' => 'required|string',
            'institute' => 'required|string',
            'duration' => 'required|string'
        ]);
        $certificate = new Certificate();
        $certificate->create($certificateData);
        return response()->json(['message', 'certificate added successfuly'],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Certificate $certificate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Certificate $certificate)
    {
        
        $request->validate([
            'name' => 'required|string',
            'institute' => 'required|string',
            'duration' => 'required|string'
        ]);
        $certificate->name = $request['name'];
        $certificate->institute = $request['institute'];
        $certificate->duration = $request['duration'];
        $certificate->save();
        return response()->json(['message' , 'certificate updated successfuly'],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificate $certificate)
    {
        $certificate->delete();
        return response()->json(['message' , 'certificate deleted successfuly'],201);
    }
}
