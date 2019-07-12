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
use Carbon\Carbon;
use Illuminate\Http\Request;

class GetCode extends Controller {

    function handle(Request $request) {
        $this->validate($request, [
             'email' => 'required|string'
        ]);

        /**
         * @var $pre Code
         */
        $pre = Code::query()->where('email', $request->input('email'))->latest()->first();
        if (!$pre) {
            if ($pre->create_at->addMinute() > Carbon::now()) {
                return parent::error(403, '请不要频繁发送信息哦');
            }
        }

        $code = new Code();
        $code->email = $request->input('email');
        $code->sendMsg($request->input('email'));
        $code->save();
    }
}