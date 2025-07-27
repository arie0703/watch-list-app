# 設計要件

- フロントエンド: React/Vite
- バックエンド: Supabase
- セッション管理: Vercel KV
- データベース: Supabase (PostgreSQL)

## 詳細

DB操作はsupabaseのAPI経由で行う。
ルーム作成処理・入室処理はsupabase functionを呼び出して実施する。

## ディレクトリ構造

```
watch-list-app/
├── src/                          # フロントエンドのソースコード
│   ├── components/               # Reactコンポーネント
│   ├── hooks/                    # カスタムフック
│   ├── libs/                     # ユーティリティライブラリ
│   ├── types/                    # TypeScript型定義
│   ├── assets/                   # 静的アセット（画像、アイコン）
│   ├── App.tsx                   # メインアプリケーションコンポーネント
│   ├── App.scss                  # アプリケーション全体のスタイル
│   ├── common.scss               # 共通スタイル
│   └── main.tsx                  # アプリケーションのエントリーポイント
├── supabase/                     # Supabase関連の設定とコード
│   ├── functions/                # Edge Functions
│   ├── migrations/               # データベースマイグレーション
├── spec/                         # 仕様書
│   ├── design.md                 # 設計要件（このファイル）
│   └── requirement.md            # 機能要件
├── public/                       # 静的ファイル
├── tsconfig.json                 # TypeScript設定
├── vite.config.ts                # Vite設定
└── README.md                     # プロジェクト説明
```

## 設計原則

1. **関心の分離**: 各ディレクトリは明確な責任を持つ
2. **再利用性**: 共通機能は適切な場所に配置
3. **保守性**: 関連するファイルは近くに配置
4. **拡張性**: 新機能追加時に適切な場所に配置できる構造
