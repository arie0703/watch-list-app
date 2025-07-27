import { supabase, headers } from "../_shared/consts.ts";
import { ResponseBody } from '../_shared/types.ts';

Deno.serve(async (req) => {
  // CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: headers,
    })
  }

  try {
    // データベース接続テスト
    const { error } = await supabase
      .from("room")
      .select("count")
      .limit(1);

    if (error) {
      // エラーの詳細情報をコンソールに出力
      console.error('Database connection error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        stack: error.stack
      });

      const body: ResponseBody = {
        message: "データベース接続エラー",
        error: error.message,
        status: 503,
      };

      return new Response(
        JSON.stringify(body),
        { 
          headers: headers,
          status: 503
        }
      );
    }

    // 正常な場合
    const body: ResponseBody = {
      message: "システムは正常に動作しています",
      status: 200,
    };

    return new Response(
      JSON.stringify(body),
      { 
        headers: headers,
        status: 200
      }
    );

  } catch (error) {
    // 予期しないエラーの場合
    // エラーの詳細情報をコンソールに出力
    console.error('Unexpected error:', {
      type: error.constructor.name,
      message: error.message,
      stack: error.stack
    });

    const body: ResponseBody = {
      message: "システムエラーが発生しました",
      error: error.message,
      status: 500,
    };

    return new Response(
      JSON.stringify(body),
      { 
        headers: headers,
        status: 500
      }
    );
  }
}); 
