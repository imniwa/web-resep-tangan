<?php

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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::controller(WebController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/search', 'search')->name('search');
    Route::post('/search', 'search');
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
