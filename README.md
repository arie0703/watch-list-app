# Watchlist App
やりたいことをメモ・シェアするアプリ

## 使用技術
- React
- Vite
- Supabase (Postgres)
- Vercel KV (Redis)

## テーブル

### Watchlist

| Column Name | Type | Constraints |
| ---- | ---- | ---- |
| id | number | primary key |
| name | text | Not NULL |
| comment | text | |
| likes | number | |
| created_at | timestamp | |
| room_uuid | timestamp | foreign key room.uuid, CASCADE |

### Room

| Column Name | Type | Constraints |
| ---- | ---- | ---- |
| uuid | uuid | primary key |
| name | text | Not NULL, Unique |
| entry_pass | text | Not NULL |
| created_at | timestamp | |

## アプリケーションの起動
`yarn dev`

## supabase (ローカル)

### supabaseコンテナの起動/停止

`yarn supabase start`

`yarn supabase stop`

### マイグレーション

`yarn supabase migration new create_XXXXX_table`

`yarn supabase migration up`

### Edge Function

ローカルで関数を実行

`supabase functions serve --no-verify-jwt`

```sh
curl --request POST 'http://localhost:54321/functions/v1/create-room' \
  --header 'Content-Type: application/json' \
  --data '{ "roomName":"TEST" }'
```