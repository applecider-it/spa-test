# 設計

## Webサイト

- NuxtJS (SSG)、Vite、Tailwind
- Vue、Vue Router、Vite、Tailwind
- Astro (SSG)、Client Router、Vite、Tailwind

NuxtJSにコンテンツ管理がある以外は、全部同じ作り。

Astroのコンテンツ管理は、`astro-app`参照。

## APIサーバー

- NestJSのAPIサーバー

## 技術選定の理由

- Node SSRは、危なっかしいので、Nuxt (SSG), Vue, Astro (SSG)を選択。（同じ理由で、Node SSRを使う場合はInertiaもおすすめできません。）
- 認証は安全性を優先してjwtトークンではなくセッションを選択。
- なぜreactを使わないかは`docker-test`参照。
