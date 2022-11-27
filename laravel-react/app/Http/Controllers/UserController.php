<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
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
                'isMe' => $username == session('user')->username ? true : false
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
        return redirect()->route('user-recipe', [
            'username' => session('user')->username,
            'title' => Str::replace('-', ' ', $request->title)
        ]);
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

    public function update(Request $request)
    {
        $data = [
            'multipart' => []
        ];
        foreach ($request->only(['username', 'name', 'media']) as $k => $val) {
            if ($val != null) {
                if ($k != 'media' && session('user')->$k == $val) {
                    continue;
                }
                array_push($data['multipart'], [
                    'name' => $k,
                    'contents' => $k !== 'media' ? $val : \GuzzleHttp\Psr7\Utils::tryFopen($val->getPathname(), 'r')
                ]);
            }
        }
        $res = $this->post('auth/update', $data);
        if (!$res->status) {
            return redirect()->back()->withErrors(['message' => 'gagal mengupdate akun']);
        }
        if ($request->password != null && $request->old_password != null) {
            $data = [];
            foreach ($request->only(['old_password', 'password']) as $k => $val) {
                array_push($data, [$k => $val]);
            }
            $res = $this->post('auth/update-password', $data);
            if (!$res->status) {
                return redirect()->back()->withErrors(['password' => 'kata sandi lama tidak tepat']);
            }
        }
        $res = $this->post('auth/refresh');
        if ($res->status) {
            Session::put('user', $res->data->user);
            Session::put('token', $res->data->authorization->token);
        }
        return redirect()->back()->with(['success' => 'berhasil mengupdate akun']);
    }
}
