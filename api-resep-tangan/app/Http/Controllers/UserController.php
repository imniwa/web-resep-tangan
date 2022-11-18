<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Follows;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
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
}
