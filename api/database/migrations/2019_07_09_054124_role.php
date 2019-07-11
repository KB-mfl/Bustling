<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class Role extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('role', function (Blueprint $table) {
           $table->integer('id')->comment('role_id');
           $table->string('alias')->comment('alias');
           $table->string('name')->comment('name');
           $table->primary('id');

           $table->softDeletes();
           $table->timestamps();
        });
        DB::table('role')->insert([
            [
                'id' => 0,
                'alias' => 'admin',
                'name' => '管理员'
            ],
            [
                'id' => 1,
                'alias' => 'user',
                'name' => '用户'
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
        Schema::dropIfExists('role');
    }
}
