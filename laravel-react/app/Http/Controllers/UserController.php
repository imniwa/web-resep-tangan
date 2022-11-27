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
            $res = $this->get('recipes/' . $username . '/' . $title);
            return Inertia::render('RecipeDetails', [
                'data' => $res == null ? null : $res->data
            ]);
        } else {
            $user = json_decode($this->api()->request('GET', 'user/' . $username)->getBody()->getContents());
            return Inertia::render('UserDetails', [
                'user' => $user->data,
                'isMe' => false
            ]);
        }
    }

    public function upload()
    {
        return Inertia::render('UploadRecipe');
    }

    public function post_recipe(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'banner' => 'required|image'
        ]);
        $title = Str::lower($request->title);
        $title = Str::replace(' ', '-', $title);
        $res = $this->get('recipes/check-title/' . $title);
        if (!$res->status) {
            return redirect()->back()->withErrors([
                'title' => 'anda sudah membuat resep ini, gunakan nama lain.'
            ]);
        }
        $data = [
            'multipart' => []
        ];
        foreach ($request->only(['title', 'description', 'banner', 'materials']) as $key => $value) {
            if ($key === 'materials') {
                foreach ($value as $val) {
                    array_push($data['multipart'], [
                        'name' => $key . '[]',
                        'contents' => $val
                    ]);
                }
            } else {
                array_push($data['multipart'], [
                    'name' => $key,
                    'contents' => $key === 'banner' ? \GuzzleHttp\Psr7\Utils::tryFopen($value->getPathname(), 'r') : $value
                ]);
            }
        }
        // Upload Recipe
        $res = $this->post('recipes/add', $data);

        if (!empty($request->contents)) {
            // Upload Contents
            $recipe_id = $res->data->id;
            foreach ($request->contents as $content) {
                $data = [
                    'multipart' => []
                ];
                foreach ($content as $key => $val) {
                    array_push($data['multipart'], [
                        'name' => $key,
                        'contents' => $key !== 'media' ? $val : \GuzzleHttp\Psr7\Utils::tryFopen($val->getPathname(), 'r')
                    ]);
                }
                array_push($data['multipart'], [
                    'name' => 'recipe_id',
                    'contents' => $recipe_id
                ]);
                $res = $this->post('recipes/contents', $data);
            }
        }
        return self::show($request, session('user')->username, Str::replace('-', ' ', $request->title));
    }

    public function user(Request $request)
    {
        $user = json_decode($this->api()->request('GET', 'user/' . session('user')->username)->getBody()->getContents());
        return Inertia::render('UserDetails', [
            'user' => $user->data,
            'isMe' => true,
        ]);
    }

    public function settings()
    {
        return Inertia::render('UserSettings');
    }
}
