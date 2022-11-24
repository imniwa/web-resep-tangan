<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        return Inertia::render('Auth/Login');
    }

    public function register(Request $request)
    {
        switch ($request->method()) {
            case 'GET':
                return Inertia::render('Auth/Register');
                break;
            case 'POST':
                $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => 'required|string|email|max:255',
                    'password' => 'required|string|min:6',
                ]);
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
                break;
        }
    }
}
