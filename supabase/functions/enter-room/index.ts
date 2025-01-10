import { compareSync } from 'https://deno.land/x/bcrypt/mod.ts';
import { supabase, generateRandomString } from "../common.ts"

Deno.serve(async (req) => {
  const { roomName, roomPass } = await req.json();

  if (!roomName || !roomPass) {
    return new Response(
      JSON.stringify({
        message: "パラメータにroomName, roomPassを渡してください"
      }),
      { status: 400 }
    );
  }

  const { data, error } = await supabase.from("room")
  .select("uuid, entry_pass")
  .eq('name', roomName)
  .limit(1);

  if (error) {
    return new Response(
      JSON.stringify(error),
      { status: 500 }
    );
  }

  if (!data[0].entry_pass) {
    return new Response(
      JSON.stringify({
        message: "部屋が見つかりませんでした"
      }),
      { status: 400 }
    );
  }

  const hashedPassword = data[0].entry_pass
  const isCorrect = compareSync(roomPass, hashedPassword);
  if (isCorrect) {

    const sessionID = generateRandomString();

    const body = {
      message: "入室に成功しました",
      sessionID: sessionID,
    };

    return new Response(
      JSON.stringify(body),
      { headers: { "Content-Type": "application/json" } },
    );
  }
  return new Response(
    JSON.stringify({
      message: "パスワードが違います",
    }),
  );
  
})