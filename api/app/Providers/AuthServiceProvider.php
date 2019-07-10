<?php

namespace App\Providers;

use App\Models\ApiToken;
use App\Models\User;
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
            if ($request->input('api_token')) {
                /**
                 * @var $api_token ApiToken
                 */
                $api_token = ApiToken::query()->where('token', $request->input('api_token'))->first();
                if ($api_token) {
                    if ($api_token->expired_at < Carbon::now()) {
                        return null;
                    } else {
                        $api_token->addTime($request->input('remember'));
                        $api_token->save();
                        return $api_token->user();
                    }
                }
            } else {
                return null;
            }
        });
    }
}
