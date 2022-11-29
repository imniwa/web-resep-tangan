<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Controller;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $status = json_decode(Controller::api(true)->request('GET', 'auth/is-valid-token')->getBody()->getContents())->status;
        if ($status) {
            return $next($request);
        } else {
            Session::flush();
            return redirect()->route('login')->withErrors(['message' => 'sesi anda habis, silahkan login kembali']);
        }
    }
}
