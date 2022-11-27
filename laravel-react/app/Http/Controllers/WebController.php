<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class WebController extends Controller
{
    public function home()
    {
        $res = $this->get('user/top');
        $topUsers = $res == null ? [] : $res->data;
        $res = $this->get('recipes/top');
        $topRecipes = $res == null ? [] : $res->data;
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
            $res = $this->get('recipes/' . $query);
        } else {
            $res = $this->get('recipes/all');
        }
        return Inertia::render('SearchResult', [
            'query' => $query,
            'result' => $res == null ? [] : $res->data
        ]);
    }
}
