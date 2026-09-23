# API

## 認証

### email認証

Method: POST

URI: /auth/login

Params:

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| email | メールアドレス | string |  |
| password | パスワード | string |  |

### ログアウト

Method: POST

URI: /auth/logout

### 認証ユーザー

Method: POST

URI: /auth/me


## ツイート

### ツイート一覧

Method: POST

URI: /tweet/tweets

### ツイート登録

Method: POST

URI: /tweet/tweet

Params:

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| content | 内容 | string |  |
