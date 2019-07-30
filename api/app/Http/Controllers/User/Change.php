<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 30/07/2019
 * Time: 16:55
 */
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @api {PUT} user/profile 修改简介-Change
 * @apiGroup User
 * @apiName Change
 * @apiPermission Login
 * @apiParam {string} [username] 用户名
 * @apiParam {string} [avatar] 头像
 * @apiParam {string} [introduction] 个人介绍
 * @apiParam {integer} [gender] 性别
 * @apiParamExample {json} Request-Example:
 * {
 *      'username': 'test',
 *      'avatar': 'example.png',
 *      'introduction': '我很帅',
 *      'gender': 1
 * }
 */

class Change extends Controller {

    function handle(Request $request) {
        /**
         * @var User $user
         */
        $user = Auth::user();
        if (!$user) return parent::error(401, '请先登陆哦');
        $this->validate($request, [
            'gender' => 'integer|nullable',
            'username' => 'string|nullable',
            'avatar' => 'string|nullable',
            'introduction' => 'string|nullable',
        ]);
        $username = User::query()->where('username', $request->input('username'))->first();
        if ($username && $username->id !== $user->id) {
            return parent::error(422, '用户名已被使用哦');
        }

        $user->gender = $request->input('gender', $user->gender);
        $user->username = $request->input('username', $user->username);
        $user->avatar = $request->input('avatar', $user->avatar);
        $user->introduction = $request->input('introduction', $user->introduction);

        $user->save();
    }
}