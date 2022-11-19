<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Views;
use Illuminate\Http\Request;

class ViewsController extends Controller
{
    public static function add(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required'
        ]);
        if ($request->cookie('name') != null) {
            $token = $request->cookie('name');
            $exist = Views::where('token', $token)->first();
            if (!$exist) {
                Views::create([
                    'recipe_id' => $request->recipe_id,
                    'token' => $token
                ]);
            }
        }
    }

    public function views(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required'
        ]);
        $data = Views::where('recipe_id', $request->recipe_id)->count();
        return new PostResponse(true, resource: $data);
    }

    public function add_views(Request $request)
    {
        self::add($request);
        return $this->views($request);
    }
}
