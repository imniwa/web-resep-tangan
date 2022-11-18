<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return new PostResponse(false, 'Unauthorized');
        }

        $user = Auth::user();
        return new PostResponse(true, 'success', [
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $pos = strpos($request->email, '@');
        $username = Str::substr($request->email, 0, $pos);

        while (User::where('username', $username)->first()) {
            $username .= Str::random(3);
        }

        $user = User::create([
            'name' => $request->name,
            'username' => $username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);
        return new PostResponse(true, 'User Created successfully', [
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function change_password(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:6'
        ]);

        $user = User::where('id', $request->user()->id);
        $user->update(['password' => Hash::make($request->password)]);
        return new PostResponse(true, 'Password Changed successfully', Auth::logout());
    }

    public function logout()
    {
        Auth::logout();
        return new PostResponse(true, 'Successfully logged out');
    }

    public function me()
    {
        return new PostResponse(true, 'success', ['User' => Auth::user()]);
    }

    public function refresh()
    {
        return new PostResponse(true, 'success', [
            'user' => Auth::user(),
            'authorization' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
