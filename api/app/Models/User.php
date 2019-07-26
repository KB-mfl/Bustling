<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use PascalDeVink\ShortUuid\ShortUuid;

/**
 * Class User
 * @package App\Models
 *
 * @property integer $gender
 * @property string $username
 * @property string $email
 * @property string $id
 * @property string $password
 * @property string $introduction
 * @property string $avatar
 * @property integer $role_id
 *
 * @property-read Role $role
 */
class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    protected $table = 'user';
    protected $keyType = 'string';

    public $incrementing = false;

    use SoftDeletes;

    function __construct(array $attributes = []) {
        parent::__construct($attributes);

        $this->attributes['id'] = ShortUuid::uuid4();
    }

    function setPasswordAttribute($password) {
        $this->attributes['password'] = app('hash')->make(sha1($password));
    }

    function apiToken() {
        return $this->hasMany('App\Models\ApiToken', 'user_id', 'id');
    }

    function role() {
        return $this->belongsTo('App\Models\Role', 'role_id', 'id');
    }

    function getData($type = 'list') {
        $data = [];
        if ($type === 'detail') {
            $data['introduction'] = $this->introduction;
            $data['role'] = $this->role->data;
        }
        $data['username'] = $this->username;
        $data['avatar'] = $this->avatar;
        $data['gender'] = $this->gender;
        $data['email'] = $this->email;
        return $data;
    }

}
