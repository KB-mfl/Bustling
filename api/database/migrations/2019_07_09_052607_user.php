<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class User extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->string('id')->comment('short uuid');
            $table->integer('role_id')->default(1)->comment('角色id');
            $table->string('username')->comment('用户名');
            $table->string('email')->unique()->comment('用户邮箱');
            $table->string('avatar')->nullable()->comment('用户头像');
            $table->string('password')->comment('密码');
            $table->text('introduction')->nullable()->comment('简介');
            $table->integer('gender')->default(0)->comment('性别');
            $table->primary('id');

            $table->softDeletes();
            $table->timestamps();
        });

        DB::table('user')->insert([
            [
                'id' => 0,
                'role_id' => 0,
                'username' => 'admin',
                'email' => '1716175849@qq.com',
                'password' => app('hash')->make(sha1('bustling')),
                'gender' => 1
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
}
