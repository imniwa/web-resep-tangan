<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    private static $dir = 'users';
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'email_check', 'token_validation']]);
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

    public function email_check(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email|max:255|unique:users',
            ]);
            return new PostResponse(true, 'The email available.');
        } catch (\Exception $e) {
            return new PostResponse(false, $e->getMessage());
        }
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
            ]);
        } catch (\Exception $e) {
            return new PostResponse(false, $e->getMessage());
        }

        $pos = strpos($request->email, '@');
        $username = Str::substr($request->email, 0, $pos);

        while (User::where('username', $username)->first()) {
            $username .= Str::random(3);
        }

        $user = User::create([
            'name' => Str::lower($request->name),
            'username' => Str::lower($username),
            'email' => Str::lower($request->email),
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

    public function update(Request $request)
    {
        $data = [];
        foreach ($request->only(['username', 'media', 'password']) as $k => $d) {
            if ($k == 'media') {
                $data[$k] = json_encode(FileController::move($request->file('media'), self::$dir));
            } else if ($k == 'password') {
                $data[$k] = Hash::make($request->password);
            } else {
                $data[$k] = Str::lower($d);
            }
        }
        $user = User::where('id', Auth::user()->id)->first();
        $user->update($data);
        if (isset($data['password'])) {
            Auth::logout();
        }
        return new PostResponse(true, resource: $user);
    }

    public function token_validation(Request $request)
    {
        return new PostResponse(Auth::check());
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
