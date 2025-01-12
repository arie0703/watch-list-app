import { kv } from "@vercel/kv";
import { supabase } from "../hooks/useWatchList";
import { EntryRoomResponse } from "../types/entryRoom";
import { NewRoomResponse } from "../types/newRoom";

export const retrieveSession = async(sessionID: string) => {
  const result: string | null = await kv.get<string>(sessionID);
  return result;
}

export const entryRoom = async (
  roomName: string,
  roomPass: string,
): Promise<EntryRoomResponse> => {

  const { data, error } = await supabase.functions.invoke('enter-room', {
    body: { 
      roomName: roomName,
      roomPass: roomPass 
    },
    method: "POST",
  })

  if (error) {
    console.log(error)
    return {
      status: 400,
      message: '入室に失敗しました',
      isSuccess: false,
    }
  }

  if (!data.sessionID) {
    return {
      status: 500,
      message: data.message || "",
      isSuccess: false,
      error: data.error || "",
    }
  }

  const {sessionID, roomUUID } = data;
  console.log("セッションが作成されました");

  // KVSに入室状況を記録
  kv.set(sessionID, roomUUID);

  return {
    status: 200,
    message: '入室に成功しました',
    sessionId: sessionID,
    roomUUID: roomUUID,
    isSuccess: true,
  }
};


export const newRoom = async (
  roomName: string,
): Promise<NewRoomResponse> => {

  const { data, error } = await supabase.functions.invoke('create-room', {
    body: { 
      roomName: roomName,
    },
    method: "POST",
  })

  if (error) {
    return {
      status: 500,
      message: 'ルームの作成に失敗しました',
      error: error.toString() || "",
      isSuccess: false,
    }
  }

  if (!data.isSuccess) {
    return {
      status: 500,
      message: data.message || "",
      isSuccess: false,
      error: data.error || ""
    }
  }

  const {sessionID, roomUUID, roomPass} = data;

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
