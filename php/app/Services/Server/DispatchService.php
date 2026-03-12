<?php

namespace App\Services\Server;

use App\Services\Output\LogService as Log;

/**
 * ルートごとの処理
 */
class DispatchService
{
    public function exec(string $method, string $uri, ?array $jsonData): array
    {
        if ($uri === '/send-test') {
            $data = [
                'method' => $method,
                'uri' => $uri,
                'message' => 'テストメッセージ',
                'jsonData' => $jsonData,
            ];

            if (!isset($_SESSION['cnt'])) $_SESSION['cnt'] = 0;

            $_SESSION['cnt']++;

            return $data;
        } else if ($uri === '/auth') {
            usleep(1000000 * 0.3);

            $userId = $_SESSION['user_id'] ?? null;

            $user = null;
            if ($userId) {
                $user = [
                    'name' => 'テスト',
                ];
            }
            $data = [
                'user' => $user,
            ];

            return $data;
        } else if ($uri === '/login') {
            $_SESSION['user_id'] = 1;

            return [
                'status' => true,
            ];
        } else if ($uri === '/logout') {
            unset($_SESSION['user_id']);

            return [
                'status' => true,
            ];
        }

        return [
            'error' => 'invalid uri',
        ];
    }
}
