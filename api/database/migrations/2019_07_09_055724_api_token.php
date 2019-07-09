<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ApiToken extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api_token', function (Blueprint $table) {
            $table->increments('id')->comment('自增');
            $table->string('user_id')->comment('用户id');
            $table->string('token')->unique()->comment('uuid');
            $table->timestamp('expired_at')->comment('过期时间');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('api_token');
    }
}
