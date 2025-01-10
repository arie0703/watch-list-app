import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { hashSync } from 'https://deno.land/x/bcrypt/mod.ts';
import { supabase, generateRandomString } from "../common.ts"

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
  const { roomName } = await req.json()

  try {
    // ランダムなroomパスワードを作成する
    const roomPass = generateRandomString();
    // bcryptを使ってパスワードをハッシュ化
    const hashedPassword = hashSync(roomPass);
    const roomUUID = await InsertRoomData(roomName, hashedPassword);

    // 作成したルームのセッションを作る
    const sessionID = generateRandomString();

    const body = {
      message: "ルームを作成しました",
      entryPass: roomPass,
      roomUUID: roomUUID,
      sessionID: sessionID,
      isSuccess: true
    }

    // レスポンスとしてハッシュ化されたパスワードを返す
    return new Response(
      JSON.stringify(body),
      { 
        headers: { 'Content-Type': 'application/json'},
        status: 201,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        message: "ルーム作成処理に失敗しました",
        error: error 
      }), 
      { status: 500 }
    );
  }
})