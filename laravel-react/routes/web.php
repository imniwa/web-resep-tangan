<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebController;
use App\Http\Middleware\EnsureTokenIsValid;
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

// domain.com/
Route::group([
    'prefix' => '/'
], function () {

    Route::controller(WebController::class)->group(function () {
        Route::get('/', 'home')->name('home');
        Route::get('/search', 'search')->name('search');
        Route::get('/search/{query}', 'search');
    });

    Route::controller(AuthController::class)->group(function () {
        Route::get('/login', 'login')->name('login');
        Route::post('/login', 'login');
        Route::get('/register', 'register')->name('register');
        Route::post('/register', 'register');
        Route::get('/logout', 'logout')->name('logout');
    });

    Route::group([
        'controller' => UserController::class
    ], function () {
        Route::middleware(EnsureTokenIsValid::class)->group(function () {
            Route::get('/me', 'user')->name('profile');
            Route::get('/settings', 'settings')->name('settings');
            Route::post('/settings', 'update');
            Route::controller(RecipeController::class)->group(function () {
                Route::get('/upload-recipe', 'upload')->name('upload');
                Route::post('/upload-recipe', 'add');
                Route::post('/delete-recipe', 'delete')->name('delete-recipe');
                Route::post('/edit-recipe', 'edit')->name('edit-recipe');
                Route::post('/comment-recipe', 'comment')->name('comment-recipe');
                Route::post('/delete-comment-recipe', 'delete_comment')->name('delete-comment-recipe');
                Route::post('/rating-recipe', 'rating')->name('rating-recipe');
            });
        });
        Route::post('/follow', [FollowController::class, 'follow'])->name('follow');
        Route::get('/{username}', 'show')->name('user');
        Route::get('/{username}/{title}', 'show')->name('user-recipe');
    });
});

// domain.com/recipe
Route::group([
    'prefix' => 'recipe',
    'controller' => RecipeController::class
], function () {
    Route::get('/{title}', 'show')->name('recipe');
});
