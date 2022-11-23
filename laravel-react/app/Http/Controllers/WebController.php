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

    public function search(Request $request, $query = null)
    {
        return Inertia::render('SearchResult');
    }
}
