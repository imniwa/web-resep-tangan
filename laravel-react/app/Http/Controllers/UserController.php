<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function show(Request $request, $username, $title = null)
    {
        if ($title) {
            $res = json_decode($this->api()->request('GET', 'recipes/' . $username . '/' . $title)->getBody()->getContents());
            return Inertia::render('RecipeDetails', [
                'data' => $res->data
            ]);
        } else {
            $user = json_decode($this->api()->request('GET', 'user/' . $username)->getBody()->getContents());
            return Inertia::render('UserDetails', [
                'user' => $user->data
            ]);
        }
    }

    public function upload()
    {
        return Inertia::render('UploadRecipe');
    }

    public function user(Request $request)
    {
        return Inertia::render('Profile');
    }

    public function settings()
    {
        return Inertia::render('UserSettings');
    }
}
