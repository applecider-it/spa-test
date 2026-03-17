<?php

namespace App\Services\Auth;

use App\Services\Output\LogService as Log;

/**
 * 認証処理
 */
class AuthService
{
    /** ログイン */
    public function login(): void
    {
        $_SESSION['user_id'] = 1;
    }

    /** ログアウト */
    public function logout(): void
    {
        unset($_SESSION['user_id']);
    }

    /** 認証チェック */
    public function auth(): array
    {
        $userId = $_SESSION['user_id'] ?? null;

        $user = null;
        if ($userId) {
            $user = [
                'id' => $userId,
                'name' => 'テスト',
            ];
        }
        $data = [
            'user' => $user,
        ];

        return $data;
    }
}
