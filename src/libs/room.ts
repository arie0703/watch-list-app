import { supabase } from "../hooks/useWatchList";
import { EntryRoomResponse } from "../types/entryRoom";

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

  // localStorageに入室状況を保存する
  localStorage.setItem('currentRoom', roomName);

  return {
    status: 200,
    message: 'ログインに成功しました',
    isSuccess: true,
  }
};