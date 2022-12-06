<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Follows;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowsController extends Controller
{

    public function is_exist($user, $follow)
    {
        return Follows::where('id_user', $user)->where('follow', $follow)->first() != null;
    }

    public function is_following(Request $request)
    {
        $request->validate([
            'username' => 'required'
        ]);
        $user = Auth::user();
        $follow = User::where('username', $request->username)->first();
        if (self::is_exist($user->id, $follow->id)) {
            return new PostResponse(true);
        } else {
            return new PostResponse(false);
        }
    }

    public function add_following(Request $request)
    {
        $request->validate([
            'username' => 'required'
        ]);
        $user = Auth::user();
        $follow = User::where('username', $request->username)->first();
        if ($follow && self::is_exist($user->id, $follow->id)) {
            return new PostResponse(false);
        }
        $data = [
            'id_user' => $user->id,
            'follow' => $follow->id
        ];
        return new PostResponse(true, resource: Follows::create($data));
    }

    public function delete_following(Request $request)
    {
        $request->validate([
            'username' => 'required'
        ]);
        $user = Auth::user();
        $follow = User::where('username', $request->username)->first();
        if ($follow && !self::is_exist($user->id, $follow->id)) {
            return new PostResponse(false);
        }
        $fol = Follows::where('id_user', $user->id)
            ->where('follow', $follow->id)
            ->first();
        $fol->delete();
        return new PostResponse(true, resource: $fol);
    }
}
