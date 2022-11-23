<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WebController extends Controller
{
    public function home()
    {
        return Inertia::render('Home');
    }

    public function search(Request $request)
    {
        if ($request->all() != null) {
            $query = $request->only('query');
        }
        return Inertia::render('SearchResult', [
            'data' => isset($query) ? $query : null
        ]);
    }
}
