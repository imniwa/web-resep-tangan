<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Rating;
use App\Models\Recipes;
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
            $rating = Rating::where('recipe_id', $recipe_id)->get();
            return floatval(number_format($rating->average('rating'), 2));
        }
        if ($id) {
            return Rating::where('id', $id)->get()->rating;
        }
        return null;
    }

    public static function add($data)
    {
        return Rating::create($data);
    }

    public function rating(Request $request)
    {
        $rating = self::get(recipe_id: $request->recipe_id);
        return new PostResponse(true, resource: $rating);
    }

    public function self_rating(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required',
        ]);
        $user = Auth::user();
        $rating = Recipes::where('user_id', $user->id)
            ->where('id', $request->recipe_id)->first();
        if (empty($rating)) {
            return new PostResponse(false);
        } else {
            return new PostResponse(true);
        }
    }

    public function add_rating(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required',
            'rating' => 'required'
        ]);
        $user = Auth::user();
        $recipes = Recipes::findOrFail($request->recipe_id);
        if ($recipes->user()->first()->id == $user->id) {
            return new PostResponse(false, 'recipe');
        }
        $rating = Rating::where('user_id', $user->id)
            ->where('recipe_id', $request->recipe_id)->first();
        if ($rating != null) {
            return new PostResponse(false);
        }
        $data = $request->only(['recipe_id', 'rating']);
        $data['user_id'] = $user->id;
        return new PostResponse(true, resource: self::add($data));
    }

    public function update_rating(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required',
            'rating' => 'required'
        ]);
        $user = Auth::user();
        $rating = Rating::where('user_id', $user->id)
            ->where('recipe_id', $request->recipe_id)
            ->first();
        $rating->update(['rating' => $request->rating]);
        return new PostResponse(true, resource: $rating);
    }
}
