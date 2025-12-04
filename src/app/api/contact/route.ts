import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(request: NextRequest) {
  try {
    // Supabase Server Clientが初期化されているか確認
    if (!supabaseServer) {
      console.error('Supabase Server Client is not initialized');
      return NextResponse.json(
        { 
          error: 'Supabase Server Client is not configured. Please set SUPABASE_SERVICE_ROLE_KEY in your .env.local file.' 
        },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('JSON parse error:', error);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { name, company, email, topic, message } = body;

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Supabaseにデータを挿入（Server Clientを使用、RLSをバイパス）
    console.log('Inserting data into Supabase:', { name, company, email, topic, message });
    console.log('Using Supabase Server Client (service role key)');
    
    const { data, error } = await supabaseServer
      .from('contacts')
      .insert([
        {
          name,
          company: company || null,
          email,
          topic: topic || null,
          message,
          // created_atはDEFAULT NOW()で自動設定されるため、手動で設定しない
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to save contact form', 
          details: error.message,
          code: error.code,
          hint: error.hint
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('API error:', errorMessage, errorStack);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

