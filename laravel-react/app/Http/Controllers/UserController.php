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
            if (session('user')) {
                $self = $this->post('recipes/rating/self', [
                    'form_params' => [
                        'recipe_id' => $res->data->id
                    ]
                ]);
                if (!empty($self->data)) {
                    $self_rating = $self->data;
                }
            }
            return Inertia::render('RecipeDetails', [
                'recipe' => $res == null ? null : $res->data,
                'self_rating' => isset($self_rating) ? $self_rating->rating : false
            ]);
        } else {
            if (session('user') && $username == session('user')->username) {
                return redirect()->route('profile');
            }
            $user = json_decode($this->api()->request('GET', 'user/' . $username)->getBody()->getContents());
            return Inertia::render('UserDetails', [
                'user' => $user->data,
                'isMe' => session('user') && $username == session('user')->username ? true : false
            ]);
        }
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
