<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    protected function error($code, $message = '') {
        return response([
            'code' => $code,
            'message' => $message
        ], $code);
    }
}
