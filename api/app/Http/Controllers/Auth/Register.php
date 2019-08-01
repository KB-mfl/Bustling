<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 09/07/2019
 * Time: 15:06
 */
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ApiToken;
use App\Models\Code;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

/**
 * @api {POST} auth/register 注册-Register
 * @apiGroup Auth
 * @apiName Register
 * @apiPermission All
 * @apiParam {string} username 注册名字
 * @apiParam {string} password 密码(sha1加密)
 * @apiParam {string} email 注册邮箱
 * @apiParam {string} code 验证码(6位)
 * @apiParamExample {json} Request-Example:
 * {
 *      'username': 'test',
 *      'password': 'd033e22ae348aeb5660fc2140aec35850c4da997',
 *      'email': 'haha@example.com',
 *      'code': '123456'
 * }
 * @apiSuccess {string} token Api-Token
 * @apiSuccessExample {json} Success-Response:
 * {
 *      'token': 'b2336207-3136-47aa-9362-de45f3e49e65'
 * }
 */

class Register extends Controller {

    function handle(Request $request) {
        $this->validate($request, [
            'username' => 'required|string|',
            'password' => 'required|string|size:40',
            'email' => 'required',
            'code' => 'required'
        ]);

        $user = User::query()->where('email', $request->input('email'))->first();
        if($user) {
            return parent::error(401, '该邮箱已被注册哦');
        }
        $user = User::query()->where('username', $request->input('username'))->first();
        if($user) {
            return parent::error(401, '该用户名已被注册哦');
        }
        $user = new User();

        /**
         * @var $code Code
         */
        $code = Code::query()->where('email', $request->input('email'))->latest()->first();
        if (!$code || $code->code !== $request->input('code')) {
            return parent::error(401, '验证码错误');
        }
        if ($code->expired_at < Carbon::now()) {
            return parent::error(401, '验证码过期了哦');
        }
        $user->username = $request->input('username');
        $user->password = $request->input('password');
        $user->email = $request->input('email');

        $user->save();

        $api_token = new ApiToken();
        $api_token->user_id = $user->id;
        $api_token->addTime();
        $api_token->save();

        return response([
            'token' => $api_token->token
        ]);
    }
}