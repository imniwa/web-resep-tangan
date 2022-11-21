<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Rating;
use App\Models\Recipes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class RecipesController extends Controller
{
    private static $dir = 'recipes';
    public function __construct()
    {
        if (!Storage::exists(self::$dir)) {
            Storage::makeDirectory(self::$dir);
        }
        $this->middleware('auth:api', ['except' => ['recipes']]);
    }
    public static function get($options = [])
    {
        $id = isset($options['id']) ? $options['id'] : null;
        $title = isset($options['title']) ? $options['title'] : null;
        if ($id) {
            $recipes = Recipes::where('id', $id)->get();
        } else if ($title) {
            $recipes = Recipes::where('title', 'like', '%' . $title . '%')->get();
        } else {
            $recipes = Recipes::all();
        }
        foreach ($recipes as $recipe) {
            $r = Recipes::findOrFail($recipe->id);
            $recipe->views = $r->views()->count();
            $recipe->rating = floatval(number_format(Rating::where('recipe_id', $recipe->id)->get()->average('rating'), 2));
            $recipe->user = $r->user()->first();
            $recipe->contents = $r->contents()->get();
            $recipe->comments = $r->comments()->get();
        }
        return $recipes;
    }
    public static function add($data)
    {
        return Recipes::create($data);
    }
    public static function update($id, $data)
    {
        return Recipes::where('id', $id)->first()->update($data);
    }
    public static function delete($id)
    {
        return Recipes::where('id', $id)->first()->delete();
    }

    public function recipes(Request $request)
    {
        if (Cookie::get('resep_tangan_session') == null) {
            Cookie::queue('resep_tangan_session', $request->ip() . '|' . Str::random(6), 60);
            if ($request->id) {
                $request->merge(['recipe_id' => $request->id]);
                ViewsController::add($request);
                return new PostResponse(true, resource: self::get(['id' => $request->id]));
            }
            if ($request->title) {
                $request->merge(['recipe_id' => Recipes::where('title', 'like', '%' . $request->title . '%')->get()->id]);
                ViewsController::add($request);
                return new PostResponse(true, resource: self::get(['title' => $request->title]));
            }
        }
        return new PostResponse(true, resource: self::get());
    }

    public function add_recipes(Request $request)
    {
        $request->validate([
            'title' => 'required|string|min:2|max:64',
            'banner' => ['required', File::image()->smallerThan((2 * 1024) - 64)],
            'materials' => 'required|array'
        ]);
        $data = [
            'title' => Str::lower($request->title),
            'description' => $request->description,
            'user_id' => $request->user()->id,
            'banner' => json_encode(FileController::move($request->file('banner'), self::$dir)),
            'materials' => implode('\\n', $request->materials)
        ];
        $recipes = self::add($data);
        return new PostResponse(true, 'Recipes created successfully', $recipes);
    }

    public function update_recipes(Request $request)
    {
        $request->validate([
            'id' => 'required'
        ]);
        $id = $request->id;
        $data = [];
        foreach ($request->only(['title', 'description', 'banner', 'materials']) as $k => $d) {
            if (isset($d) && $d != null) {
                if ($k == 'materials') {
                    $request->validate([
                        'materials' => 'array'
                    ]);
                    $data[$k] = implode('\\n', $d);
                } else if ($k == 'banner') {
                    $request->validate([
                        'banner' => ['required', File::image()->smallerThan((2 * 1024) - 64)],
                    ]);
                    $data[$k] = FileController::move($request->file('banner'), self::$dir);
                } else {
                    $data[$k] = $request->$d;
                }
            }
        }
        self::update($id, $data);
        return new PostResponse(true, 'Recipes successfully updated', self::get($id)[0]);
    }

    public function delete_recipes(Request $request)
    {
        $request->validate([
            '_id' => 'required'
        ]);
        $recipes = self::get($request->_id);
        self::delete($request->_id);
        return new PostResponse(true, 'Recipes successfully deleted', $recipes);
    }
}
