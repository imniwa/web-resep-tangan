<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Follows;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowsController extends Controller
{

    public function isExist($user, $follow)
    {
        return Follows::where('id_user', $user)->where('follow')->first() != null;
    }

    public function add_following(Request $request)
    {
        $request->validate([
            'follow' => 'required'
        ]);
        $user = Auth::user();
        if (self::isExist($user->id, $request->follow)) {
            return new PostResponse(false);
        }
        $data = [
            'id_iser' => $user->id,
            'follow' => $request->follow
        ];
        return new PostResponse(true, resource: Follows::create($data));
    }

    public function delete_following(Request $request)
    {
        $request->validate([
            'follow' => 'required'
        ]);
        $user = Auth::user();
        if (!self::isExist($user->id, $request->follow)) {
            return new PostResponse(false);
        }
        $fol = Follows::where('id_user', $user->id)
            ->where('follow', $request->follow)
            ->first();
        $fol->delete();
        return new PostResponse(true, resource: $fol);
    }
}
