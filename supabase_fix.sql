-- ============================================
-- Supabase contacts テーブルとRLSポリシーの設定
-- ============================================

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

-- 6. ポリシーが正しく作成されたか確認
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'contacts';

