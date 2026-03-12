<?php

declare(strict_types=1);

namespace App\Services\Output;

/**
 * ログ管理
 */
class LogService
{
    /** ログ出力 */
    public static function output(string $message, ?array $context = null): void
    {
        $date = date('Y-m-d H:i:s');

        if (! is_null($context)) {
            $message .= ' ' . json_encode($context, JSON_UNESCAPED_UNICODE);
        }

        $line = "[$date] $message" . PHP_EOL;
        file_put_contents('php://stderr', $line, FILE_APPEND | LOCK_EX);
    }
}
