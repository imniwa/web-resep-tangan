<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function follow(Request $request)
    {
        if (!session('user')) {
            return redirect()->route('login');
        }
        if ($request->is_followed) {
            return $this->unfollow($request);
        }
        $this->post('user/follow', [
            'form_params' => [
                'username' => $request->username
            ]
        ]);
        return redirect()->back();
    }

    public function unfollow(Request $request)
    {

        $this->post('user/unfollow', [
            'form_params' => [
                'username' => $request->username
            ]
        ]);
        return redirect()->back();
    }
}
