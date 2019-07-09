<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 09/07/2019
 * Time: 16:22
 */
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Code;
use Illuminate\Http\Request;

class GetCode extends Controller {

    function handle(Request $request) {
        $this->validate($request, [
             'user_id' => 'required|string',
             'email' => 'required|string'
        ]);
        $code = new Code();
        $code->user_id = $request->input('user_id');
        $code->sendMsg($request->input('email'));
        $code->save();
        return response('ok');
    }
}