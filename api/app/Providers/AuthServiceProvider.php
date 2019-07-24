<?php

namespace App\Providers;

use App\Models\ApiToken;
use Carbon\Carbon;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($request) {
            /**
            * @var $api_token ApiToken
            */
            $token = $request->header('Api_Token', '');
            $api_token = ApiToken::query()->where('token', $token)->first();
            if (!$api_token) return null;
            if ($api_token->expired_at->timestamp < Carbon::now()->timestamp) {
                return null;
            } else {
                $api_token->addTime($request->input('remember'));
                $api_token->save();
                return $api_token->user;
            }

        });
    }
}
