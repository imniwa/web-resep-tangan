<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResponse;
use App\Models\Views;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class ViewsController extends Controller
{
    public static function add(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required'
        ]);
        $token = $request->cookie('resep_tangan_session');
        if(!$token){
            $token = Hash::make($request->ip().'|'. Str::random(8));
            Cookie::queue('resep_tangan_session',$token,120);
        }
        $exist = Views::where('token', $token)->first();
        if (!$exist) {
            Views::create([
                'recipe_id' => $request->recipe_id,
                'token' => $token
            ]);
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
