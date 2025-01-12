import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { hashSync } from 'https://deno.land/x/bcrypt/mod.ts';
import { supabase, generateRandomString, headers } from "../_shared/consts.ts";
import { ResponseBody } from "../_shared/types.ts";

const InsertRoomData = async(roomName: string, entry_pass: string) => {

  try{
    const { data, error } = await supabase.from("room")
    .insert({
      name: roomName,
      entry_pass: entry_pass
    }).select();

    if (error) {
      throw error;
    }

    return data[0].uuid
  } catch(e) {
    console.error(
      {
        error: e,
        message: "insertに失敗しました"
      }
    )
    throw e;
  }
}

Deno.serve(async (req) => {
  // TODO: preflight requestの共通化
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: headers,
    })
  }

  try {
    const { roomName } = await req.json()
    // ランダムなroomパスワードを作成する
    const roomPass = generateRandomString();
    // bcryptを使ってパスワードをハッシュ化
    const hashedPassword = hashSync(roomPass);
    const roomUUID = await InsertRoomData(roomName, hashedPassword);

    // 作成したルームのセッションを作る
    const sessionID = generateRandomString();

    const body: ResponseBody = {
      message: "ルームを作成しました",
      roomPass: roomPass,
      roomUUID: roomUUID,
      sessionID: sessionID,
      isSuccess: true,
    }

    // レスポンスとしてハッシュ化されたパスワードを返す
    return new Response(
      JSON.stringify(body),
      { 
        headers: headers,
        status: 201,
      }
    );
  } catch (error) {
    console.error(error)

    const body: ResponseBody = { 
      message: "ルーム作成処理に失敗しました",
      status: 500,
      error: error,
    };

    return new Response(
      JSON.stringify(body), 
      { 
        headers: headers,
      }
    );
  }
})
