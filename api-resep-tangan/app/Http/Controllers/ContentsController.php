<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Contents;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ContentsController extends Controller
{

    private static $dir = 'recipes/contents';

    public function __construct()
    {
        if (!Storage::exists(self::$dir)) {
            Storage::makeDirectory(self::$dir);
        }
        $this->middleware('auth:api', ['except' => ['media']]);
    }

    public static function get($recipes_id = null, $id = null)
    {
        if ($recipes_id) {
            return Contents::where('recipes_id', $recipes_id)->get();
        }
        if ($id) {
            return Contents::where('id', $id)->get();
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

    public function media(Request $request, $basename)
    {
        $file = Storage::get(self::$dir . '/' . $basename);
        if ($file) {
            $img = Image::make($file);
            return $img->response();
        }
    }

    public function add_contents(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required',
            'media' => 'required|file|mimetypes:image/jpg,image/png,image/jpeg',
            'step' => 'required|string'
        ]);
        $file = $request->file('media');
        $data = [
            'recipe_id' => $request->recipe_id,
            'media' => json_encode(FileController::move($file, self::$dir)),
            'step' => $request->step
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
        $file = $request->file('media');
        if ($file) {
            $data['media'] = json_encode(FileController::move($file, self::$dir));
        }
        if ($request->step) {
            $data['step'] = $request->step;
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
        self::delete($request->_id);
        return new PostResponse(true, 'Contents deleted', $content);
    }
}
