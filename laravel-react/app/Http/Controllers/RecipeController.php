<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class RecipeController extends Controller
{
    public function show($title)
    {
        $title = Str::replace('-', ' ', $title);
        return Inertia::render('RecipeDetails', [
            'title' => $title
        ]);
    }
}
