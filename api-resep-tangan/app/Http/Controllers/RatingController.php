<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['rating']]);
    }

    public static function get($recipe_id = null, $id = null)
    {
        if ($recipe_id) {
            return Rating::where('recipe_id', $recipe_id)->get();
        }
        if ($id) {
            return Rating::where('id', $id)->get();
        }
        return null;
    }

    public static function add($data)
    {
        return Rating::create($data);
    }

    public static function update($id, $data)
    {
        return Rating::where('id', $id)->update($data);
    }

    public function rating(Request $request)
    {
    }
    public function add_rating(Request $request)
    {
        if (!Auth::check()) {
            return new PostResponse(false, 'unauthorized');
        }
    }
    public function update_rating(Request $request)
    {
        if (!Auth::check()) {
            return new PostResponse(false, 'unauthorized');
        }
    }
}