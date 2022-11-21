<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Follows;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    private static $dir = 'users';
    public function user($username)
    {
        $user = User::where('username', $username)->first();
        $user = User::findOrFail($user->id);
        $user->recipes = $user->recipes()->get();
        $user->followers = Follows::where('follow', $user->id)->count();
        $user->following = Follows::where('id_user', $user->id)->count();
        return new PostResponse(true, resource: $user);
    }

    public function following($username)
    {
        $user = User::where('username', $username)->first();
        $following = Follows::where('id_user', $user->id)->count();
        return new PostResponse(true, resource: $following);
    }

    public function followers($username)
    {
        $user = User::where('username', $username)->first();
        $followers = Follows::where('follow', $user->id)->count();
        return new PostResponse(true, resource: $followers);
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
                $data[$k] = $d;
            }
        }
        $user = User::where('id', Auth::user()->id)->first();
        $user->update($data);
        return new PostResponse(true, resource: $user);
    }
}
