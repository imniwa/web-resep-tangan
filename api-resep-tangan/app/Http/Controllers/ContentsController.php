<?php

namespace App\Http\Controllers;

use App\Models\Contents;
use Illuminate\Http\Request;

class ContentsController extends Controller
{
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
}