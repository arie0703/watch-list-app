import { compareSync } from 'https://deno.land/x/bcrypt/mod.ts';
import { supabase, generateRandomString, headers } from "../_shared/consts.ts";
import { ResponseBody } from '../_shared/types.ts';

Deno.serve(async (req) => {
  // TODO: preflight requestの共通化
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: headers,
    })
  }

  const { roomName, roomPass } = await req.json();

  if (!roomName || !roomPass) {
    const body: ResponseBody = {
      status: 400,
      message: "パラメータにroomName, roomPassを渡してください"
    };

    return new Response(
      JSON.stringify(body),
      { 
        headers: headers,
      }
    );
  }

  const { data, error } = await supabase.from("room")
  .select("uuid, entry_pass")
  .eq('name', roomName)
  .limit(1);

  if (error) {
    const body: ResponseBody = {
      message: "入室処理に失敗しました",
      error: error,
      status: 500,
    };

    return new Response(
      JSON.stringify(body),
      { 
        headers: headers,
      }
    );
  }

  if (!data[0]) {
    const body = {
      message: "部屋が見つかりませんでした",
      status: 400,
    };

    return new Response(
      JSON.stringify(body),
      { 
        headers: headers,
      }
    );
  }

  const hashedPassword = data[0].entry_pass
  const isCorrect = compareSync(roomPass, hashedPassword);
  if (isCorrect) {

    const sessionID = generateRandomString();

    const body: ResponseBody = {
      message: "入室に成功しました",
      status: 200,
      roomUUID: data[0].uuid,
      sessionID: sessionID,
    };

    return new Response(
      JSON.stringify(body),
      { 
        headers: headers,
        status: 200
      },
    );
  }

  const body: ResponseBody = {
    message: "パスワードが違います",
    status: 400,
  };

  return new Response(
    JSON.stringify(body),
    { 
      headers: headers,
    }
  );
  
})
