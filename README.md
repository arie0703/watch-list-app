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