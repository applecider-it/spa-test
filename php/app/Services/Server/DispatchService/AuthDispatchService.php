<?php

namespace App\Services\Server\DispatchService;

use App\Services\Output\LogService as Log;

/**
 * 認証関連の処理
 */
trait AuthDispatchService
{
    /** 認証チェック */
    private function execAuth(): array
    {
        usleep(1000000 * 0.3);  // 動作確認用

        $data = $this->authService->auth();

        return $data;
    }

    /** ログイン */
    private function execAuthLogin(): array
    {
        $this->authService->login();

        return [
            'status' => true,
        ];
    }

    /** ログアウト */
    private function execAuthLogout(): array
    {
        $this->authService->logout();

        return [
            'status' => true,
        ];
    }
}
