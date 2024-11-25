import { kv } from "@vercel/kv";
import { supabase } from "../hooks/useWatchList";
import { EntryRoomResponse } from "../types/entryRoom";
import { decrypt, encrypt } from "./cryption";
import { NewRoomResponse } from "../types/newRoom";

// セッションID, ルームパスワードとして用いるランダム文字列を生成
const generateRandomString = () => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const N = 16
  const randomString = Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('')
  return randomString
}

const getRoomUUID = async(roomName: string) => {
  const { data, error } = await supabase.from("room")
    .select("uuid")
    .eq('name', roomName)
    .limit(1);

  if (error) {
    throw error;
  }

  return data[0].uuid;
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

  const sessionID = generateRandomString();
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


export const newRoom = async (
  roomName: string,
): Promise<NewRoomResponse> => {

  // ランダムなroomパスワードを作成し、暗号化する
  const roomPass = generateRandomString();
  const encryptedRoomPass = encrypt(roomPass);

  const { error } = await supabase.from("room")
    .insert({
      name: roomName,
      entry_pass: encryptedRoomPass
    });

  if (error) {
    return {
      status: 500,
      message: `ルームの作成に失敗しました`,
      isSuccess: false,
      error: error.message,
    };
  }

  // 作成したルームのセッションを作る
  const sessionID = generateRandomString();
  const roomUUID = await getRoomUUID(roomName);

  if (!roomUUID) {
    return {
      status: 500,
      message: `作成したルームの入室に失敗しました`,
      isSuccess: false,
    };
  }

  // KVSに入室状況を記録
  kv.set(sessionID, roomUUID);
  console.log("セッションが作成されました");

  

  return {
    status: 200,
    message: 'ルームの作成に成功しました',
    sessionId: sessionID,
    roomInfo: {
      name: roomName,
      pass: roomPass,
      uuid: roomUUID,
    },
    isSuccess: true,
  }
};
