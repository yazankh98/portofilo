<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Language;
use App\Models\User;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $language = Language::all();
        return response()->json(['language', $language],201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);
        $languageData = $request->validate([
            'name' => 'required|string',
            'about' => 'required|string',
        ]);
        $language = new Language();
        $language->create($languageData);
        return response()->json(['message', 'language added successfuly'],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Language $language)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Language $language)
    {
        $this->authorize('create', User::class);
        $request->validate([
            'name' => 'required|string',
            'about' => 'required|string',
        ]);
        $language->name = $request['name'];
        $language->about = $request['about'];
        $language->save();
        return response()->json(['message', 'language updated successfuly'],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Language $language)
    {
        $language->delete();
        return response()->json(['message', 'language deleted successfuly'],201);
    }
}
