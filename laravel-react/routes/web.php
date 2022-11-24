<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group([
    'prefix' => '/'
], function () {

    Route::controller(WebController::class)->group(function () {
        Route::get('/', 'home')->name('home');
        Route::get('/search', 'search')->name('search');
        Route::post('/search', 'search');
    });

    Route::controller(AuthController::class)->group(function () {
        Route::get('/login', 'login')->name('login');
        Route::get('/register', 'register')->name('register');
        Route::post('/register', 'register');
    });
});

Route::group([
    'prefix' => 'recipe',
    'controller' => RecipeController::class
], function () {
    Route::get('/{title}', 'show')->name('recipe');
});

Route::group([
    'prefix' => 'user',
    'controller' => UserController::class
], function () {
    Route::get('/upload-recipe', 'upload')->name('upload');
    Route::get('/{username}', 'show')->name('user');
});
