<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use PascalDeVink\ShortUuid\ShortUuid;
use PHPUnit\Exception;

/**
 * Class User
 * @package App\Models
 *
 * @property integer $gender
 * @property string $username
 * @property string $email
 * @property string $password
 * @property string $introduction
 * @property string $avatar
 */
class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    protected $keyType = 'string';

    use SoftDeletes;

    function __construct(array $attributes = []) {
        parent::__construct($attributes);

        $attributes['id'] = ShortUuid::uuid4();
    }

    function setPasswordAttribute($password) {
        $this->password = app('hash')->make(sha1($password));
    }

    function apiToken() {
        return $this->hasMany('App\Models\ApiToken', 'user_id', 'id');
    }

}
