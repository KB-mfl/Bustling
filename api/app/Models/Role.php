<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 26/07/2019
 * Time: 10:51
 */
namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;


/**
 * Class Role
 * @package App\Models
 *
 * @property integer $id
 * @property string $alias
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $deleted_at
 *
 * @property-read integer $count
 * @property-read User[] $user
 * @property-read array $data
 */
class Role extends Model {

    protected $table = 'role';

    public function getDataAttribute() {
        return $this->getData();
    }

    public function getCountAttribute() {
        return $this->user()->count();
    }

    public function user() {
        return $this->hasMany('App\Models\User', 'role_id', 'id');
    }

    public function getData() {
        return [
            'roleId' => $this->id,
            'alias' => $this->alias,
            'name' => $this->name,
        ];
    }


}