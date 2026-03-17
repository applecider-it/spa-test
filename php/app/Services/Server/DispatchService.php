<?php

namespace App\Services\Server;

use App\Services\Output\LogService as Log;

use App\Services\Auth\AuthService;

/**
 * ルートごとの処理
 */
class DispatchService
{
    use DispatchService\AuthDispatchService;
    use DispatchService\DevelopmentDispatchService;

    private AuthService $authService;

    function __construct(
        private string $method,
        private string $uri,
        private ?array $jsonData,
    ) {
        $this->authService = new AuthService;
    }

    public function exec(): array
    {
        if ($this->uri === '/send-test') {
            return $this->execDevelopmentSendTest();
        } else if ($this->uri === '/auth') {
            return $this->execAuth();
        } else if ($this->uri === '/login') {
            return $this->execAuthLogin();
        } else if ($this->uri === '/logout') {
            return $this->execAuthLogout();
        }

        return [
            'error' => 'invalid uri',
        ];
    }
}
