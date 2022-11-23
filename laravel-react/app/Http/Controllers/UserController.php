<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function show($username)
    {
        $username = Str::replace('-', ' ', $username);
        return Inertia::render('UserDetails', [
            'username' => $username
        ]);
    }

    public function upload()
    {
        return Inertia::render('UploadRecipe');
    }
}
