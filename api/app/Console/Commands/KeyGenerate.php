<?php
/**
 * Created by PhpStorm.
 * User: gry
 * Date: 08/07/2019
 * Time: 16:20
 */
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Symfony\Component\Console\Input\InputOption;

class KeyGenerate extends Command {
    /**
     * The command name
     *
     * @var string
     */
    protected $name = 'key:generate';

    /**
     * The command description
     *
     * @return void
     */
    public function handle() {
        $key = $this->getRandomKey();
        if ($this->option('show')) {
            return $this->line('<comment>'.$key.'</comment>');
        }
        $path = base_path('.env');
        if (file_exists($path)) {
            file_put_contents(
                $path,
                str_replace('APP_KEY=' . env('APP_KEY'), 'APP_KEY=' . $key, file_get_contents($path))
            );
        }
        $this->info("Application key [$key] set successfully.");
    }

    /**
     * Generate a random key for the application
     *
     * @return string
     */

    protected function getRandomKey() {
        return Str::random(32);
    }

    protected function getOptions() {
        return array(
            array('show', null, InputOption::VALUE_NONE, 'Simply display the key instead of modify files'),
        );
    }
}