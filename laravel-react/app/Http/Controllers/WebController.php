<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class WebController extends Controller
{
    public function home()
    {
        $res = $this->api()->request('GET', 'user/top');
        $topUsers = json_decode($res->getBody()->getContents())->data;
        $res = $this->api()->request('GET', 'recipes/top');
        $topRecipes = json_decode($res->getBody()->getContents())->data;
        return Inertia::render('Home', [
            'topUsers' => $topUsers,
            'topRecipes' => $topRecipes
        ]);
    }

    public function search(Request $request, $query = null)
    {
        if ($query) {
            $query = Str::lower($query);
            $query = Str::replace(' ', '-', $query);
            $res = json_decode($this->api()->request('GET', 'recipes/' . $query)->getBody()->getContents());
            return Inertia::render('SearchResult', [
                'query' => $query,
                'result' => $res->data
            ]);
        } else {
            return 'without query';
        }
    }
}
