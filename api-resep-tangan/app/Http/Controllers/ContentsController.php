<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Contents;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ContentsController extends Controller
{

    private static $dir = 'recipes/contents';

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['get_contents']]);
    }

    public static function get($recipes_id = null, $id = null)
    {
        if ($recipes_id) {
            return Contents::where('recipe_id', $recipes_id)->get();
        }
        if ($id) {
            return Contents::where('id', $id)->first();
        }
        return null;
    }
    public static function add($data)
    {
        return Contents::create($data);
    }
    public static function update($id, $data)
    {
        return Contents::where('id', $id)->update($data);
    }
    public static function delete($id)
    {
        return Contents::where('id', $id)->delete();
    }

    // public function content(Request $request)
    // {
    //     return new PostResponse(true,resource:self::get())
    // }

    public function get_contents(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required'
        ]);
        return new PostResponse(true, resource: self::get(recipes_id: $request->recipe_id));
    }

    public function add_contents(Request $request)
    {
        if (isset($request->id)) {
            return $this->update_contents($request);
        }
        $request->validate([
            'recipe_id' => 'required',
            'media' => 'required|file|mimetypes:image/jpg,image/png,image/jpeg',
            'step' => 'required|string'
        ]);
        $file = $request->file('media');
        $data = [
            'recipe_id' => $request->recipe_id,
            'media' => json_encode(FileController::move($file, self::$dir)),
            'step' => Str::lower($request->step)
        ];
        return new PostResponse(true, resource: self::add($data));
    }

    public function update_contents(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);
        if (self::get(id: $request->id) == null) {
            return new PostResponse(true, 'contents not found');
        }
        $data = [];
        $old = json_decode(self::get(id: $request->id)->media)->path;
        $file = $request->file('media');
        if ($file) {
            $data['media'] = json_encode(FileController::update($old, $file, self::$dir));
        }
        if ($request->step) {
            $data['step'] = Str::lower($request->step);
        }
        self::update($request->id, $data);
        return new PostResponse(true, 'Contents updated', self::get(id: $request->id));
    }
    public function delete_contents(Request $request)
    {
        $request->validate([
            '_id' => 'required'
        ]);
        $content = self::get(id: $request->_id);
        if ($content == null) {
            return new PostResponse(true, 'Contents not found', $content);
        }
        FileController::delete(json_decode($content->media)->path);
        self::delete($request->_id);
        return new PostResponse(true, 'Contents deleted', $content);
    }
}
