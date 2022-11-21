<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileController extends Controller
{
    /**
     * @param Illuminate\Http\UploadedFile $file
     * @param string|null $dir
     * @return array|null
     */
    public static function move($file, $dir = null)
    {
        $basedir = $dir;
        if ($dir == null) {
            $dir = storage_path('app/');
        } else {
            if (!Storage::exists($dir)) {
                Storage::makeDirectory($dir);
            }
            $dir = storage_path('app/' . $dir);
        }
        $basename = strtotime(now()) . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
        $file = $file->move($dir, $basename);
        $media = [
            'basename' => $basename,
            'path' => $basedir . '/' . $basename,
            'mimeType' => $file->getMimeType(),
            'extension' => $file->getExtension(),
            'size' => $file->getSize(),
        ];
        return $media;
    }
    /**
     * @param string $old
     * @param Illuminate\Http\UploadedFile $new
     * @return array|null
     */
    public static function update($old, $new, $dir)
    {
        if (Storage::exists($old)) {
            Storage::delete($old);
        }
        return self::move($new, $dir);
    }

    /**
     * @param string $path
     * @return bool|null
     */
    public static function delete($path)
    {
        if (Storage::exists($path)) {
            return Storage::delete($path);
        }
        return null;
    }
}
