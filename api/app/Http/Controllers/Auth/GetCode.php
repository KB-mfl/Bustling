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
             'email' => 'required|string'
        ]);
        $code = new Code();
        $code->email = $request->input('email');
        $code->sendMsg($request->input('email'));
        $code->save();
    }
}