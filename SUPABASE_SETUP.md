# Supabase設定ガイド

## 1. 環境変数の設定

プロジェクトのルートディレクトリ（`ami-landing-page`）に `.env.local` ファイルを作成し、以下の内容を追加してください：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### SupabaseのURLとAPIキーの取得方法

1. [Supabase Dashboard](https://app.supabase.com/) にログイン
2. プロジェクトを選択
3. 「Settings」→「API」に移動
4. 以下の情報をコピー：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** キー → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. データベーステーブルの作成

SupabaseのSQL Editorで以下のSQLを実行して、`contacts`テーブルを作成してください：

**方法1: SQLファイルを使用（推奨）**
1. プロジェクトルートの `supabase_fix.sql` ファイルを開く
2. 内容をすべてコピー
3. SupabaseのSQL Editorに貼り付けて実行

**方法2: 以下のSQLを直接実行**

```sql
-- 1. テーブルの作成（既に存在する場合はスキップ）
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  topic VARCHAR(100),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Row Level Security (RLS) を有効化
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 3. 既存のポリシーを削除（エラーが出ても問題ありません）
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated selects" ON contacts;

-- 4. 匿名ユーザーがINSERTできるようにポリシーを作成
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. 認証済みユーザーがSELECTできるようにポリシーを作成（オプション）
CREATE POLICY "Allow authenticated selects" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);
```

## 3. データベースパスワード

データベースパスワード: `amiamiamiami777ami`

このパスワードは、Supabaseのデータベースに直接接続する際に使用します。
通常、WebアプリケーションからはAPIキーを使用して接続するため、このパスワードは直接コードには使用しません。

## 4. 動作確認

1. `.env.local` ファイルを作成して環境変数を設定
2. Supabaseでテーブルを作成
3. 開発サーバーを再起動: `npm run dev`
4. お問い合わせフォームから送信してテスト

## トラブルシューティング

### エラー: "Supabase URL or Anon Key is missing"
- `.env.local` ファイルが正しく作成されているか確認
- 環境変数の名前が正確か確認（`NEXT_PUBLIC_` プレフィックスが必要）
- 開発サーバーを再起動

### エラー: "relation 'contacts' does not exist"
- SupabaseのSQL Editorでテーブル作成SQLを実行
- テーブル名が `contacts` であることを確認

### エラー: "new row violates row-level security policy" (Code: 42501)
- RLSポリシーが正しく設定されているか確認
- `supabase_fix.sql` ファイルのSQLを実行
- または、上記のSQLを順番に実行
- ポリシーが正しく作成されたか確認：
  ```sql
  SELECT * FROM pg_policies WHERE tablename = 'contacts';
  ```

