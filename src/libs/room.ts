import { kv } from "@vercel/kv";
import { supabase } from "../hooks/useWatchList";
import { EntryRoomResponse } from "../types/entryRoom";

// セッションIDとしてランダム文字列を生成
const generateSessionId = () => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const N = 16
  const sessionId = Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('')
  return sessionId
}

export const retrieveSession = async(sessionID: string) => {
  const result: string | null = await kv.get<string>(sessionID);
  return result;
}

export const entryRoom = async (
  roomName: string,
  roomPass: string,
): Promise<EntryRoomResponse> => {

  const { data, error } = await supabase.from("room")
    .select("*")
    .eq('name', roomName)
    .eq('entry_pass', roomPass);

  if (error) {
    return {
      status: 500,
      message: 'ログインに失敗しました',
      isSuccess: false,
      error: error,
    };
  }

  if (!data.length) {
    return {
      status: 400,
      message: 'ログインに失敗しました',
      isSuccess: false,
      error: 'ルーム名、もしくはパスワードが間違っています'
    }
  }

  const sessionID = generateSessionId();
  console.log("セッションが作成されました", sessionID);

  // KVSに入室状況を記録
  kv.set(sessionID, roomName);

  return {
    status: 200,
    message: 'ログインに成功しました',
    sessionId: sessionID,
    isSuccess: true,
  }
};