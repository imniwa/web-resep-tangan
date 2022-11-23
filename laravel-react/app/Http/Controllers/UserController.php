<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show($username)
    {
        return Inertia::render('UserDetails');
    }
}
