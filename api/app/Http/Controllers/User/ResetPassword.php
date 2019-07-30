<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 30/07/2019
 * Time: 17:10
 */
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @api {PUT} user/security 修改密码-ResetPassword
 * @apiGroup User
 * @apiName ResetPassword
 * @apiPermission Login
 * @apiParam {string} password_old 旧密码
 * @apiParam {string} password_new 新密码
 * @apiParamExample {json} Request-Example:
 * {
 *      'password_old': 'ce8749330e860006d92f26528071b26bc93d234d',
 *      'password_new': 'dc89fbb8f0bdb28a3755743032f8ab05f0e0b77d'
 * }
 */

class ResetPassword extends Controller {

    function handle(Request $request) {
        /**
         * @var User $user
         */
        $user = Auth::user();
        if (!$user) return parent::error(401, '请先登录哦');
        $this->validate($request, [
            'password_old' => 'string|required|size:40',
            'password_new' => 'string|required|size:40',
        ]);

        if (!app('hash')->check(sha1($request->input('password_old')), $user->password)) {
            return parent::error(422, '密码不正确哦');
        }
        $user->password = $request->input('password_new');

        $user->save();
    }

}