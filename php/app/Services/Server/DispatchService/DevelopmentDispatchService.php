<?php

namespace App\Services\Server\DispatchService;

use App\Services\Output\LogService as Log;

/**
 * 開発者向けページ関連の処理
 */
trait DevelopmentDispatchService
{
    /** 送信テスト */
    private function execDevelopmentSendTest(): array
    {
        $auth = $this->authService->auth();

        $data = [
            'method' => $this->method,
            'uri' => $this->uri,
            'message' => 'テストメッセージ ' . $this->jsonData['message'],
            'jsonData' => $this->jsonData,
            'auth' => $auth,
        ];

        if (!isset($_SESSION['cnt'])) $_SESSION['cnt'] = 0;

        $_SESSION['cnt']++;

        return $data;
    }
}
