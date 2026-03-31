# SPAの動作確認

あくまで実装例で、利用は非推奨です。

通常のアプリケーションでは、`laravel-app`, `rails-app`のような、MPA+island(Vue)までが無難。

## 実装内容

- Nuxt (SSG)
- NestのダミーのAPIサーバー

## 技術選定の理由

Node SSRは、危なっかしいので、SSGを選択。（同じ理由で、Inertiaもおすすめできません。）

