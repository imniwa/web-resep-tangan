<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class RecipeController extends Controller
{
    public function upload()
    {
        return Inertia::render('UploadRecipe');
    }

    public function show($title)
    {
        $title = Str::replace('-', ' ', $title);
        return Inertia::render('RecipeDetails', [
            'title' => $title
        ]);
    }

    public function delete(Request $request)
    {
        $res = $this->api(true)->request('DELETE', 'recipes/delete', [
            'form_params' => [
                '_id' => $request->_id
            ]
        ]);
        $res = json_decode($res->getBody()->getContents());
        if ($res->status) {
            return redirect()->bacK();
        }
        return redirect()->back()->withErrors(['message' => 'resep gagal dihapus']);
    }

    public function add(Request $request)
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
                    if(empty($val)){
                        continue;
                    }
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

    public function edit(Request $request, $id = null)
    {
        switch ($request->method()) {
            case 'GET':
                $res = $this->get('recipes/get/' . $id);
                if ($res->data) {
                    return Inertia::render('UploadRecipe', [
                        'recipe' => $res->data
                    ]);
                }
                return redirect()->back();
                break;
            case 'POST':
                $title = Str::lower($request->title);
                $title = Str::replace(' ', '-', $title);
                $res = $this->get('recipes/check-title/' . $title);
                // if (!$res->status) {
                //     return redirect()->back()->withErrors([
                //         'title' => 'anda sudah membuat resep ini, gunakan nama lain.'
                //     ]);
                // }
                $data = [
                    'multipart' => []
                ];
                foreach ($request->only(['id','title', 'description', 'banner', 'materials']) as $key => $value) {
                    if ($key === 'materials') {
                        foreach ($value as $val) {
                            array_push($data['multipart'], [
                                'name' => $key . '[]',
                                'contents' => $val
                            ]);
                        }
                    } else {
                        if($value){
                            array_push($data['multipart'], [
                                'name' => $key,
                                'contents' => $key === 'banner' ? \GuzzleHttp\Psr7\Utils::tryFopen($value->getPathname(), 'r') : $value
                            ]);
                        }
                    }
                }
                $res = $this->post('recipes/update', $data);
                if (!empty($request->contents)) {
                    $recipe_id = $res->data->id;
                    foreach ($request->contents as $content) {
                        $data = [
                            'multipart' => []
                        ];
                        if(isset($content['id'])){
                            array_push($data['multipart'],[
                                'name' => 'id',
                                'contents' => $content['id']
                            ]);
                        }
                        foreach ($content as $key => $val) {
                            if(empty($val) || is_array($val)){
                                continue;
                            }
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
                break;
            default:
                abort(404);
                break;
        }
    }

    public function comment(Request $request)
    {
        $request->validate([
            'comment' => 'required',
            'recipe_id' => 'required'
        ], [
            'comment.required' => 'komentar tidak boleh kosong',
            'recipe_id.required' => 'resep tidak ditemukan'
        ]);
        $res = $this->post('recipes/comments', [
            'form_params' => [
                'message' => $request->comment,
                'recipe_id' => $request->recipe_id
            ]
        ]);
        return redirect()->back();
    }

    public function delete_comment(Request $request)
    {
        $request->validate([
            '_id' => 'required'
        ]);
        $res = $this->api(true)->request('DELETE', 'recipes/comments', [
            'form_params' => $request->only('_id')
        ]);
        return redirect()->back();
    }

    public function rating(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required',
            'rating' => 'required'
        ]);
        if ($request->is_self) {
            $res = $this->put('recipes/rating', [
                'form_params' => $request->only(['recipe_id', 'rating'])
            ]);
        } else {
            $res = $this->post('recipes/rating', [
                'form_params' => $request->only(['recipe_id', 'rating'])
            ]);
        }
        return redirect()->back();
    }
}
