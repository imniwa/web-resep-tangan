<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @param string $token
     * @return \GuzzleHttp\Client
     */
    public static function api($token = '')
    {
        return new \GuzzleHttp\Client([
            'base_uri' => env('API_URL') . '/',
            'headers' => $token ? [
                'Authorization' => 'Bearer ' . $token
            ] : []
        ]);
    }
}
