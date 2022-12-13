<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Follows;
use App\Models\Recipes;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function top()
    {
        $user = User::all()->take(10);
        return new PostResponse(true, resource: $user);
    }

    public function user($username)
    {
        $user = User::where('username', $username)->first();
        if ($user == null) {
            return new PostResponse(false);
        }
        $user = User::findOrFail($user->id);
        $user->recipes = Recipes::where('user_id', $user->id)->orderByDesc('id')->get();
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
