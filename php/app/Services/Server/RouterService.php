<?php

namespace App\Services\Server;

use App\Services\Output\LogService as Log;

/**
 * ルーター
 */
class RouterService
{
    public function exec(): void
    {
        $this->init();
        $this->dispatch();
    }

    /** 初期処理 */
    private function init(): void
    {
        $allowed = [
            "http://localhost:3000",
            "http://localhost:3001"
        ];

        if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed)) {
            header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
        }

        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        // OPTIONS リクエストは事前検証（preflight）用なので早期終了
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            Log::output("OPTIONS Exit");
            http_response_code(200);
            exit();
        }

        /*
        session_set_cookie_params([
            'lifetime' => 0,
            'path' => '/',
            'domain' => 'localhost',
            'secure' => false, // httpsならtrue
            'httponly' => true,
            'samesite' => 'Lax' // localhostならLaxでOK
        ]);
        */
        session_name('SPATESTSESS');
        session_save_path(API_ROOT . '/storage/session');
        session_start();
    }

    /** Jsonのリクエストデータを取得 */
    private function getJsonRequestData(): ?array
    {
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);
        return $data;
    }

    /** URIごとの処理 */
    private function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        $jsonData = $this->getJsonRequestData();

        $dispatchService = new DispatchService;

        $data = $dispatchService->exec($method, $uri, $jsonData);

        Log::output("data", $data);
        Log::output("jsonData", $jsonData);
        Log::output("SESSION", $_SESSION);

        echo json_encode($data);
    }
}
