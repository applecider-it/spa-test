# SPAの動作確認

無難なSPAの模索。

あくまで実装例で、利用は非推奨です。

通常のアプリケーションでは、`laravel-app`, `rails-app`のような、MPA+island(Vue)までが無難。

## 構成

- Vue、Vue Router、Vite、Tailwind
- Astro (SSG)、Client Router、Vite、Tailwind
- NestJSのAPIサーバー

## 技術選定の理由

- Node SSRは、危なっかしいので、Vue, Astro (SSG)を選択。（同じ理由で、Node SSRを使う場合はInertiaもおすすめできません。）
- 認証は安全性を優先してjwtトークンではなくセッションを選択。

## 機能

- 認証
- Twitter
- ユーザー管理画面

## 認証管理

### セッション

認証はセッションで管理。

### JS変数

ログイン情報は`Auth.user()`が最初にコールされたときにJS変数に保管することで、APIの送信を最小限にしている。

JS変数なのでリロード時にクリアされる。

ログイン、ログアウト時にもクリアしている。

この仕組みは、Node SSRでは利用不可なので注意。

### その他

認証の判断は各API送信時にも行う。

