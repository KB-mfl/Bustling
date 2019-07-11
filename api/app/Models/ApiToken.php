<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 09/07/2019
 * Time: 14:20
 */
namespace App\Models;

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class ApiToken
 * @package App\Models
 *
 * @property integer $id
 * @property string $user_id
 * @property string $token
 * @property string $create_at
 * @property string $expired_at
 * @property string $update_at
 * @property string $delete_at
 */

class ApiToken extends Model {

    protected $table = 'api_token';

    use SoftDeletes;

    function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $this->attributes['token'] = Uuid::uuid4();
    }

    function user() {
        return $this->belongsTo('App\Model\User', 'user_id', 'id');
    }

    function addTime($remember) {
        if ($remember) {
            $this->attributes['expired_at'] = Carbon::now()->addMonth();
        } else {
            $this->attributes['expired_at'] = Carbon::now()->addMinutes(30);
        }
    }
}