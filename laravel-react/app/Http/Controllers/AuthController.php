<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (session('user')) {
            return redirect()->route('home');
        }
        switch ($request->method()) {
            case 'GET':
                return Inertia::render('Auth/Login');
                break;
            case 'POST':
                $res = $this->api()->request('POST', 'auth/email-checker', [
                    'form_params' => $request->only(['email'])
                ]);
                $res = json_decode($res->getBody()->getContents());
                if ($res->status) {
                    return redirect()->back()->withErrors(['email' => "Email tidak terdaftar."]);
                }
                $data = $request->only(['email', 'password']);
                $res = $this->api()->request('POST', 'auth/login', [
                    'form_params' => $data
                ]);
                $res = json_decode($res->getBody()->getContents());
                if ($res->status) {
                    Session::put(['user' => $res->data->user]);
                    Session::put(['token' => $res->data->authorization->token]);
                    return redirect()->route('home');
                }
                return redirect()->back()->withErrors(['message' => "Login gagal."]);
                break;
            default:
                return Inertia::render('Auth/Login');
                break;
        }
    }

    public function register(Request $request)
    {
        if (session('user')) {
            return redirect()->route('home');
        }
        switch ($request->method()) {
            case 'GET':
                return Inertia::render('Auth/Register');
                break;
            case 'POST':
                $res = $this->api()->request('POST', 'auth/email-checker', [
                    'form_params' => $request->only(['email'])
                ]);
                $res = json_decode($res->getBody()->getContents());
                if (!$res->status) {
                    return redirect()->back()->withErrors(['email' => "Email sudah terdaftar."]);
                }
                if ($request->password != $request->passwordConfirmation) {
                    return redirect()->back()->withErrors(['password' => "Konfimasi Password tidak tepat."]);
                }
                $data = $request->only(['name', 'email', 'password']);
                $res = $this->api()->request('POST', 'auth/register', [
                    'form_params' => $data
                ]);
                $res = json_decode($res->getBody()->getContents());
                if (!$res->status) {
                    return redirect()->back()->withErrors(['message' => $res->message]);
                }
                return redirect()->back()->with(['message' => "Akun berhasil dibuat."]);
            default:
                return Inertia::render('Auth/Register');
                break;
        }
    }

    public function logout(Request $request)
    {
        $this->post('auth/logout');
        $request->session()->flush();
        return redirect()->route('login');
    }
}
