-- ============================================
-- RLSの状態を確認
-- ============================================

-- 1. RLSが有効かどうか確認
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'contacts';

-- 2. ポリシーの一覧を確認
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'contacts';

-- 3. テーブルの所有者を確認
SELECT 
  tableowner,
  tablename
FROM pg_tables 
WHERE tablename = 'contacts';

