<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //
    public function auth()
    {
        return 'helo';
    }

    public function register(Request $request)
    {
        $rules = [
            'name'          => 'required|string|min:3|max:64',
            'email'                 => 'required|email|unique:users',
            'password'              => 'required|min:6'
        ];
        $messages = [
            'name.required'         => 'name is required',
            'name.min'              => 'name min length : 6',
            'name.max'              => 'name max length : 64',
            'email.required'        => 'email is required',
            'email.email'           => 'email invalid',
            'email.unique'          => 'email has registered',
            'password.required'     => 'password is required',
            'password.min'          => 'password min length : 6'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return new PostResponse(false, $validator->errors()->first());
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            return new PostResponse(true, 'user has registered', $user);
        } catch (\Throwable $th) {
            return new PostResponse(false, 'user failed to register');
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'email|required',
                'password' => 'required'
            ]);

            $user = User::where('email', $request->email)->first();
            if (!Hash::check($request->password, $user->password, [])) {
                return new PostResponse(false, 'Password incorrect');
            }

            $credentials = request(['email', 'password']);
            if (!Auth::attempt($credentials)) {
                return new PostResponse(false, 'email or password incorrect');
            }

            $tokenResult = $user->createToken(str()->random(40))->plainTextToken;

            $data = [
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'user' => $user
            ];
            return new PostResponse(true, 'session created successfully', $data);
        } catch (\Throwable $th) {
            return new PostResponse(false, 'failed to create session');
        }
    }
}