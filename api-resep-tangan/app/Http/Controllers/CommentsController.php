<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;

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
        }
        return Comments::where('id', $id);
    }

    public function comments()
    {
    }

    public function add_comment(Request $request)
    {
    }

    public function delete_comment(Request $request)
    {
    }
}