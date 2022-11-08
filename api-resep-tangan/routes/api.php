<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth',
    'controller' => AuthController::class
], function () {
    Route::get('/me', 'me'); // Token Required
    Route::post('/refresh','refresh')->name('refresh');
    Route::post('/login', 'login')->name('login');
    Route::post('/register', 'register')->name('register');
    Route::post('/logout','logout')->name('logout');
});

Route::group([
    'prefix' => 'recipes',
    'controller' => RecipesController::class
],function(){
    Route::get('/','recipes');
});