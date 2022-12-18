<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    private static $client;

    /**
     * @param string $token
     * @return \GuzzleHttp\Client
     */
    public static function api($token = false)
    {
        if(!self::$client){
            self::$client = new \GuzzleHttp\Client([
                'base_uri' => env('API_URL') . "/api/",
                'headers' => session('token') && $token ? [
                    'Authorization' => 'Bearer ' . session('token')
                ] : []
            ]);
        }
        return self::$client;
    }

    public static function get($url)
    {
        try {
            $client = self::api(true);
            $res = $client->get($url);
            $res = json_decode($res->getBody()->getContents());
        } catch (\Throwable $th) {
            $res = null;
        }
        return $res;
    }

    public static function post($url, $options = null)
    {
        if ($options == null) {
            $res = self::api(true)->post($url);
        } else {
            $res = self::api(true)->post($url, $options);
        }
        $res = json_decode($res->getBody()->getContents());
        return $res;
    }

    public static function put($url, $options = null)
    {
        if ($options == null) {
            $res = self::api(true)->put($url);
        } else {
            $res = self::api(true)->put($url, $options);
        }
        $res = json_decode($res->getBody()->getContents());
        return $res;
    }
}
