<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 09/07/2019
 * Time: 15:06
 */
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class Register extends Controller {

    function handle(Request $request) {
        $this->validate($request, [
            'username' => 'required|string|',
            'password' => 'required|string|size:40',
            'email' => 'required',
            'code' => 'required'
        ]);
        $user  = new User();

        $code = $user->code();
        if ($code->code !== $request->input('code')) {
            return parent::error(401, '验证码错误');
        }
        $user->username = $request->input('username');
        $user->password = $request->input('password');
        $user->email = $request->input('email');

        $user->save();
    }
}