# 設計

## 構成

- NuxtJS (SSG)、Vite、Tailwind
- Vue、Vue Router、Vite、Tailwind
- Astro (SSG)、Client Router、Vite、Tailwind
- NestJSのAPIサーバー

## 技術選定の理由

- Node SSRは、危なっかしいので、Nuxt (SSG), Vue, Astro (SSG)を選択。（同じ理由で、Node SSRを使う場合はInertiaもおすすめできません。）
- 認証は安全性を優先してjwtトークンではなくセッションを選択。
- なぜreactを使わないかは`docker-test`参照。
