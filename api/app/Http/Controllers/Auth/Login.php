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

/**
 * @api {POST} auth/login 登陆-Login
 * @apiGroup Auth
 * @apiName Login
 * @apiPermission All
 * @apiParam {string} password 密码(sha1加密)
 * @apiParam {string} username 名字
 * @apiParam {boolean} [remember] 记住我(30天)
 * @apiParamExample {json} Request-Example:
 * {
 *      'username': 'administrator',
 *      'password': 'd033e22ae348aeb5660fc2140aec35850c4da997',
 *      'remember': false
 * }
 * @apiParamExample {json} Request-Example2:
 * {
 *      'username': 'administrator',
 *      'password': 'd033e22ae348aeb5660fc2140aec35850c4da997'
 * }
 * @apiSuccess {string} token Api-Token
 * @apiSuccessExample {json} Success-response:
 * {
 *     'token': 'b2336207-3136-47aa-9362-de45f3e49e65'
 * }
 */

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
        if (!app('hash')->check(sha1($request->input('password')), $user->password)){
            return parent::error(401, '用户名或密码错误');
        }

        $api_token = new ApiToken();
        $api_token->user_id = $user->id;
        $api_token->addTime($request->input('remember'));
        $api_token->save();

        return response([
            'token' => $api_token->token
        ]);
    }
}