import { compareSync } from 'https://deno.land/x/bcrypt/mod.ts';
import { supabase, generateRandomString, headers } from "../common.ts"

Deno.serve(async (req) => {
  console.log("invoked")
  // TODO: preflight requestの共通化
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: headers,
    })
  }

  const { roomName, roomPass } = await req.json();

  if (!roomName || !roomPass) {
    return new Response(
      JSON.stringify({
        message: "パラメータにroomName, roomPassを渡してください"
      }),
      { 
        headers: headers,
        status: 400
      }
    );
  }

  const { data, error } = await supabase.from("room")
  .select("uuid, entry_pass")
  .eq('name', roomName)
  .limit(1);

  if (error) {
    return new Response(
      JSON.stringify({
        message: "入室処理に失敗しました",
        error: error,
        status: 500,
      }),
      { 
        headers: headers,
      }
    );
  }

  if (!data[0]) {
    return new Response(
      JSON.stringify({
        message: "部屋が見つかりませんでした",
        status: 400,
      }),
      { 
        headers: headers,
      }
    );
  }

  const hashedPassword = data[0].entry_pass
  const isCorrect = compareSync(roomPass, hashedPassword);
  if (isCorrect) {

    const sessionID = generateRandomString();

    const body = {
      message: "入室に成功しました",
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
  return new Response(
    JSON.stringify({
      message: "パスワードが違います",
      status: 400,
    }),
    { 
      headers: headers,
    }
  );
  
})
