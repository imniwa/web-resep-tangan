<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Comments;
use App\Models\Contents;
use App\Models\Rating;
use App\Models\Recipes;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Namshi\JOSE\Signer\OpenSSL\RSA;

class RecipesController extends Controller
{
    private static $dir = 'recipes';
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['recipes', 'top', 'search', 'all']]);
    }
    public static function get($options = [])
    {
        $id = isset($options['id']) ? $options['id'] : null;
        $title = isset($options['title']) ? $options['title'] : null;
        $username = isset($options['username']) ? $options['username'] : null;
        if ($title && $username) {
            $user_id = User::where('username', $username)->first()->id;
            $recipes = Recipes::where([
                ['title', 'like', '%' . Str::replace('-', ' ', $title) . '%'],
                ['user_id', $user_id]
            ])->get();
        } else if ($id) {
            $recipes = Recipes::where('id', $id)->get();
        } else if ($title) {
            $recipes = Recipes::where('title', 'like', '%' . Str::replace('-', ' ', $title) . '%')->get();
        } else {
            $recipes = Recipes::all();
        }
        foreach ($recipes as $recipe) {
            self::detailed($recipe);
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
    private static function detailed($recipe)
    {
        $r = Recipes::findOrFail($recipe->id);
        $recipe->materials = explode('\\n', $r->materials);
        $recipe->views = $r->views()->count();
        $recipe->rating = floatval(number_format(Rating::where('recipe_id', $recipe->id)->get()->average('rating'), 2));
        $recipe->user = $r->user()->first();
        $recipe->contents = $r->contents()->get();
        $recipe->comments = Comments::where('recipe_id', $recipe->id)->orderBy('created_at', 'desc')->get();
        foreach ($recipe->comments as $comment) {
            $user = User::where('id', $comment->user_id)->first();
            $comment->user = $user;
        }
    }

    public function check_title(Request $request, $title)
    {
        $user_id = $request->user()->id;
        $recipe = Recipes::where([
            ['user_id', $user_id],
            ['title', 'like', '%' . Str::replace('-', ' ', $title) . '%']
        ])->first();
        if ($recipe == null) {
            return new PostResponse(true);
        } else {
            return new PostResponse(false);
        }
    }

    public function recipes(Request $request, $username, $title)
    {
        if (Cookie::get('resep_tangan_session') == null) {
            Cookie::queue('resep_tangan_session', $request->ip() . '|' . Str::random(6), 60);
            if ($title && $username) {
                $recipe = self::get(['title' => $title, 'username' => $username])[0];
                $request->merge(['recipe_id' => $recipe->id]);
                ViewsController::add($request);
                return new PostResponse(true, resource: $recipe);
            } else {
                return $this->all();
            }
        }
        return new PostResponse(true, resource: self::get());
    }

    public function get_id(Request $request, $id)
    {
        $recipe = Recipes::find($id);
        if (Auth::user()->id == $recipe->user_id) {
            $recipe->materials = explode('\\n', $recipe->materials);
            $recipe->contents = $recipe->contents()->get();
            return new PostResponse(true, resource: $recipe);
        }
        return new PostResponse(false, resource: null);
    }

    public function all()
    {
        $recipes = Recipes::all();
        foreach ($recipes as $recipe) {
            $r = Recipes::findOrFail($recipe->id);
            $recipe->user = $r->user()->first();
            $recipe->rating = floatval(number_format(Rating::where('recipe_id', $recipe->id)->get()->average('rating'), 2));
        }
        return new PostResponse(true, resource: $recipes);
    }

    public function top()
    {
        $recipes = Recipes::all()->take(9);
        foreach ($recipes as $recipe) {
            $r = Recipes::findOrFail($recipe->id);
            $recipe->user = $r->user()->first();
        }
        return new PostResponse(true, resource: $recipes);
    }

    public function search($title)
    {
        $recipes = self::get(['title' => $title]);
        return new PostResponse(true, resource: $recipes);
    }

    public function add_recipes(Request $request)
    {
        if (isset($request->id)) {
            return $this->update_recipes($request);
        }
        $request->validate([
            'title' => 'required|string|min:2|max:64',
            'banner' => 'required|image|max:1980',
            'materials' => 'required|array',
            'description' => 'required|string'
        ]);
        $data = [
            'title' => Str::lower($request->title),
            'description' => $request->description,
            'user_id' => $request->user()->id,
            'banner' => json_encode(FileController::move($request->file('banner'), self::$dir)),
            'materials' => implode('\\n', $request->materials)
        ];
        $recipes = self::add($data);
        return new PostResponse(true, 'Recipes created successfully', self::get(['id' => $recipes->id])[0]);
    }

    public function update_recipes(Request $request)
    {
        $request->validate([
            'id' => 'required'
        ]);
        $id = $request->id;
        $data = [];
        $recipe = Recipes::where('id', $id)->first();
        if ($recipe == null) {
            return new PostResponse(false);
        }
        if ($recipe->user_id != Auth::user()->id) {
            return new PostResponse(false);
        }
        $banner = json_decode($recipe->banner);
        foreach ($request->only(['title', 'description', 'banner', 'materials']) as $k => $d) {
            if(empty($k)){
                continue;
            }
            if ($d == null) {
                continue;
            }
            if ($k == 'materials') {
                $request->validate([
                    'materials' => 'array'
                ]);
                $data[$k] = implode('\\n', $d);
            } else if ($k == 'banner') {
                $request->validate([
                    'banner' => 'image|max:1980',
                ]);
                $data[$k] = json_encode(FileController::update($banner->path, $request->file('banner'), self::$dir));
            } else {
                $data[$k] = $d;
            }
        }
        self::update($id, $data);
        return new PostResponse(true, 'Recipes successfully updated', self::get(['id' => $id])[0]);
    }

    public function delete_recipes(Request $request)
    {
        $request->validate([
            '_id' => 'required'
        ]);
        $recipes = self::get(['id' => $request->_id]);
        FileController::delete(json_decode($recipes[0]->banner)->path);
        self::delete($request->_id);
        return new PostResponse(true, 'Recipes successfully deleted', $recipes);
    }
}
