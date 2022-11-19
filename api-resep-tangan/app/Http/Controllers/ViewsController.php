<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Views;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ViewsController extends Controller
{
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
        $request->validate([
            'recipe_id' => 'required'
        ]);
        $token = $request->cookie('name');
        $exist = Views::where('token', $token)->first();
        if (!$exist) {
            Views::create([
                'recipe_id' => $request->recipe_id,
                'token' => $token
            ]);
        }
        return $this->views($request);
    }
}
