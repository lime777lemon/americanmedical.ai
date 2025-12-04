import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 環境変数が設定されている場合のみクライアントを作成（クライアントサイド用）
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully');
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
  }
} else {
  console.warn('Supabase URL or Anon Key is missing. Please check your environment variables.');
  console.warn('URL:', supabaseUrl ? 'Set' : 'Missing');
  console.warn('Key:', supabaseAnonKey ? 'Set' : 'Missing');
}

export { supabase };

