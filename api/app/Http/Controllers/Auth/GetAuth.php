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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetAuth extends Controller {

    function handle(Request $request) {
        /**
         * @var $user User
         */
        $user = Auth::user();
        if (!$user) return parent::error(401);

        $response = $user->getData();
        return response($response);
    }
}