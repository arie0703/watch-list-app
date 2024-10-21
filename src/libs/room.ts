import { kv } from "@vercel/kv";
import { supabase } from "../hooks/useWatchList";
import { EntryRoomResponse } from "../types/entryRoom";
import { decrypt } from "./cryption";

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
    .select("uuid, entry_pass")
    .eq('name', roomName)
    .limit(1);

  if (error) {
    return {
      status: 500,
      message: '入室に失敗しました',
      isSuccess: false,
      error: error,
    };
  }

  const decryptedRoomPass = decrypt(data[0].entry_pass);

  if (decryptedRoomPass != roomPass) {
    return {
      status: 400,
      message: '入室に失敗しました',
      isSuccess: false,
      error: 'ルーム名、もしくはパスワードが間違っています'
    }
  } 

  const sessionID = generateSessionId();
  console.log("セッションが作成されました");

  // KVSに入室状況を記録
  kv.set(sessionID, data[0].uuid);

  return {
    status: 200,
    message: '入室に成功しました',
    sessionId: sessionID,
    roomUUID: data[0].uuid,
    isSuccess: true,
  }
};