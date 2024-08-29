<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $data = $request->validate([
            'email' => 'required | string |email ',
            'password' => 'required | string |min:8 '
        ]);
        $user = User::where("email", $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message', 'the email or password is wrorng'], 401);
        }
        
        $token = $user->createToken($user->email . "-authtoken")->plainTextToken;

        DB::table('users')->where('email', $user->email)->update(['remember_token' => $token]);

        return response()->json(["token" => $token], 201);
    }
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response()->json(["message" => "logout"], 201);
    }
}
