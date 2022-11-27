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
    public static function api($token = false)
    {
        return new \GuzzleHttp\Client([
            'base_uri' => env('API_URL') . "/api/",
            'headers' => session('token') && $token ? [
                'Authorization' => 'Bearer ' . session('token')
            ] : []
        ]);
    }

    public static function get($url)
    {
        try {
            $res = self::api(true)->get($url);
            $res = json_decode($res->getBody()->getContents());
        } catch (\Throwable $th) {
            $res = null;
        }
        return $res;
    }

    public static function post($url, $options)
    {
        try {
            $res = self::api(true)->post($url, $options);
            $res = json_decode($res->getBody()->getContents());
        } catch (\Throwable $th) {
            $res = null;
        }
        return $res;
    }
}
