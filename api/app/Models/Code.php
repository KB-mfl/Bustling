<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 09/07/2019
 * Time: 16:07
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

/**
 * Class Code
 * @package App\Models
 *
 * @property string $user_id
 * @property string $code
 * @property string $expired_at
 */
class Code extends Model {

    protected $table = 'code';

    use SoftDeletes;

    function __construct(array $attribute = []) {

        parent::__construct($attribute);
        $code = random_int(0, 999999);
        $codeStr = '' . $code;
        while (strlen($codeStr) < 6) {
            $codeStr = '0' . $codeStr;
        }
        $this->code = $codeStr;
        $this->expired_at = Carbon::now()->addMinutes(3);
    }


    function sendMsg($email) {
        $msg = '您现在正在进行注册，您的验证码为'.$this->code.',验证码将在3分钟内失效，若非本人操作，请忽略此邮件。';
        Mail::raw($msg, function ($message) use ($email) {
            $message->to($email);
        });
    }
}