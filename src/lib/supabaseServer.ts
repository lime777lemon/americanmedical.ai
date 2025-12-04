import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// 環境変数が設定されている場合のみクライアントを作成
let supabaseServer: SupabaseClient | null = null;

if (supabaseUrl && supabaseServiceRoleKey) {
  try {
    supabaseServer = createClient(
      supabaseUrl,
      supabaseServiceRoleKey, // ← API Route 用（絶対に公開しない）
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    console.log('Supabase Server Client initialized (service role key)');
  } catch (error) {
    console.error('Failed to create Supabase Server Client:', error);
  }
} else {
  console.warn('Supabase Server Client: Missing environment variables');
  console.warn('URL:', supabaseUrl ? 'Set' : 'Missing');
  console.warn('Service Role Key:', supabaseServiceRoleKey ? 'Set' : 'Missing');
}

export { supabaseServer };

