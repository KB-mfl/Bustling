<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 09/07/2019
 * Time: 13:16
 */
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ApiToken;
use App\Models\User;
use Illuminate\Http\Request;

class Login extends Controller {

    function handle(Request $request) {
        $this->validate($request, [
            'username' => 'required|string',
            'password' => 'required|string|size:40',
            'remember' => 'boolean|nullable'
        ]);
        /**
         * @var $user User
         */
        $user = User::query()->where('username', $request->input('username'))->first();
        if (!$user) return parent::error(401, '用户名或密码错误');
        if (!app('hash')->check($user->password, $request->input('password'))) return parent::error(401, '用户名或密码错误');

        $api_token = new ApiToken();
        $api_token->addTime($request->input('remember'));
        $api_token->save();

        return response([
            'api_token' => $api_token->token
        ]);
    }
}