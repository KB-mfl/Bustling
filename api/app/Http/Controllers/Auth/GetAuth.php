<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 12/07/2019
 * Time: 09:11
 */

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

/**
 * @api {GET} auth/auth 获取用户信息-GetAuth
 * @apiGroup Auth
 * @apiName GetAuth
 * @apiPermission Login
 * @apiSuccess {string} username 用户名
 * @apiSuccess {string} avatar 头像
 * @apiSuccess {string} email 邮箱
 * @apiSuccess {integer} gender 性别
 * @apiSuccess {integer} roleId 角色
 * @apiSuccess {text} introduction 简介
 * @apiSuccess {json} Success-Example:
 * {
 *      'username': 'test',
 *      'avatar': 'picture.png',
 *      'email': 'haha@example.com'
 *      'gender': 1
 *      'roleId': 1
 *      'introduction': 'this is a good people'
 * }
 */

class GetAuth extends Controller {

    function handle() {
        /**
         * @var $user User
         */
        $user = Auth::user();
        if ($user === null) return parent::error(401);
//        dd($user);
        return response($user->getData('detail'));
    }
}