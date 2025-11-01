# リストア手順

supabaseプロジェクトがコンソールから復元不能になった際のリストア手順

まず事前にsupabaseで新規プロジェクトを作成しておく

## backupファイルの保存

本リポジトリのsupabase/backup/data/にプロジェクトのバックアップファイルを解凍した状態で格納する

## Postgresコンテナの実行

```sh
# project rootで実行
docker run --rm -it --name pg_restore -v ${PWD}:/src postgres:17 bash
```

## バックアップの実行

新プロジェクトの上部メニューからConnectを選択し、Transaction Poolerでの接続情報を取得した上でpsqlコマンドを実行する

```sh

# Transaction Pooler
psql -h aws-1-ap-northeast-1.pooler.supabase.com -p 5432 -d postgres -U postgres.[projectID] -f /src/supabase/backup/data/db_cluster-xx-xx-xxxx@xx-xx-xx.backup

```

## Edge Functionsの再デプロイ

```sh
yarn supabase login

yarn supabase functions deploy --project-ref [projectID]

```

## 環境変数の更新

Vercelで設定しているVITE_SUPABASE_URL, VITE_SUPABASE_KEYを新しいプロジェクトのものに変更し、再デプロイする
