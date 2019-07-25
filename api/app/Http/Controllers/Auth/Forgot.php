<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 12/07/2019
 * Time: 09:11
 */
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Code;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

/**
 * @api {PUT} auth/forgot 忘记密码-Forgot
 * @apiGroup Auth
 * @apiName Forgot
 * @apiPermission Login
 * @apiParam {string} email 邮箱
 * @apiParam {string} password 新密码
 * @apiParamExample {json} Request-Example:
 * {
 *      'email': 'haha@example.com',
 *      'password': 'd033e22ae348aeb5660fc2140aec35850c4da997'
 * }
 *
 */

class Forgot extends Controller {

    function handle(Request $request) {

        $this->validate($request, [
            'email' => 'required',
            'password' => 'required|size:40',
            'code' => 'required|size:6',
        ]);

        $email = $request->input('email');
        $user = User::query()->where('email', $email)->first();
        if (!$user) return parent::error(403, "该用户不存在");

        $code = Code::query()->where('email', $email)->latest()->first();
        if (!$code || $code->code !== $request->input('code')) {
            return parent::error(401, '验证码错误');
        }
        if ($code->expired_at < Carbon::now()) {
            return parent::error(401, '验证码过期了哦');
        }

        $msg = '您的密码已修改，快去登陆看看吧。';
        Mail::raw($msg, function ($massage) use ($email) {
            $massage->to($email);
        });

        /**
         * @var $user User
         */
        $user = User::query()->where('email', $email)->first();
        $user->password = $request->input('password');
        $user->save();
    }
}