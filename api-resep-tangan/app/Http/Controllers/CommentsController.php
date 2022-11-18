<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Comments;
use App\Models\Recipes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{
    public static function get($id = null, $user_id = null, $recipes_id = null)
    {
        if ($user_id && $recipes_id) {
            return Comments::where('user_id', $user_id)->where('recipes_id', $recipes_id)->get();
        }
        if ($user_id) {
            return Comments::where('user_id', $user_id)->get();
        }
        if ($recipes_id) {
            return Comments::where('recipes_id', $recipes_id)->get();
        } else {
            return Comments::where('id', $id)->first();
        }
        return null;
    }

    public static function add($data)
    {
        return Comments::create($data);
    }

    public static function delete($id)
    {
        return Comments::findOrFail($id)->delete();
    }

    public function comments(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required'
        ]);
        if ($request->user_id != null) {
            return new PostResponse(true, resource: self::get(user_id: $request->user_id, recipes_id: $request->recipe_id));
        }
        return new PostResponse(true, resource: self::get(recipes_id: $request->recipe_id));
    }

    public function add_comment(Request $request)
    {
        $request->validate([
            'message' => 'required',
            'recipe_id' => 'required'
        ]);
        $user = Auth::user();
        $data = $request->only(['message', 'recipe_id']);
        $data['user_id'] = $user->id;
        return new PostResponse(true, resource: self::add($data));
    }

    public function delete_comment(Request $request)
    {
        $request->validate([
            '_id' => 'required'
        ]);
        $comment = self::get(id: $request->_id);
        self::delete($request->_id);
        return new PostResponse(true, resource: $comment);
    }
}
