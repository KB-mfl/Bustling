<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
/**
 * @var $router \Laravel\Lumen\Routing\Router
 */
$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group([
    'namespace' => 'Auth',
    'prefix' => 'auth'
], function () use ($router) {
    $router->post('register', 'register@handle');

    $router->post('login', 'Login@handle');

    $router->post('code', 'GetCode@handle');

    $router->get('auth', 'GetAuth@handle');

    $router->put('forgot', 'Forgot@handle');
});

$router->group([
    'namespace' => 'File'
], function () use ($router) {
    $router->post('/upload', 'Upload@handle');
});
