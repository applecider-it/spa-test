# DB

## ユーザー

users

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| id | ID | serial | Primary |
| name | 名前 | TEXT |  |
| email | メールアドレス | TEXT |  |
| password | パスワード | TEXT |  |

## ユーザーツイート

user_tweets

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| id | ID | serial | Primary |
| user_id | ユーザーID | INTEGER | `users` |
| content | 内容 | TEXT |  |
| created_at | 作成日時 | TIMESTAMP |  |

## 管理者

admin_users

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| id | ID | serial | Primary |
| name | 名前 | TEXT |  |
| email | メールアドレス | TEXT |  |
| password | パスワード | TEXT |  |
