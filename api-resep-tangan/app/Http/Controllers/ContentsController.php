<?php

namespace App\Http\Controllers;

use App\Models\Contents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ContentsController extends Controller
{

    private static $dir = 'recipes/contents';

    public function __construct()
    {
        if (!Storage::exists(self::$dir)) {
            Storage::makeDirectory(self::$dir);
        }
        $this->middleware('auth:api', ['except' => ['get_contents']]);
    }

    public static function getDir()
    {
        return storage_path('app/' . self::$dir);
    }

    public static function get($recipes_id)
    {
        return Contents::where('recipes_id', $recipes_id)->get();
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

    public function contents(Request $request)
    {
    }

    public function add_contents(Request $request)
    {
        $request->validate([
            'media' => 'required|file|mimetypes:video/*,image/jpg,image/png,image/jpeg',
            'description' => 'required|string'
        ]);
        $file = $request->file('media');
        $basename = Hash::make($request->user()->id . now(), [
            'memory' => 128,
            'time' => 1,
            'threads' => 1
        ]) . '.' . $file->getClientOriginalExtension();
        $file = $file->move(self::getDir(), $basename);
        $media = [
            'basename' => $basename,
            'path' => self::$dir . '/' . $basename,
            'mimeType' => $file->getMimeType(),
            'extension' => $file->getExtension(),
            'size' => $file->getSize()
        ];
        return $media;
    }

    public function update_contents(Request $request)
    {
    }
    public function delete_contents(Request $request)
    {
    }
}