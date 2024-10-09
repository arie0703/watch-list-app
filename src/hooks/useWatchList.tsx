import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { WatchList } from "../types/watchlist";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// supabase/supabase-js docs: https://supabase.com/docs/reference/javascript/start
export const getWatchList = async (roomUUID: string) => {
  const { data, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("room_uuid", roomUUID)
    .order("id", { ascending: false });

  if (error) {
    throw error;
  }
  return data;
};

export const addWatchList = async (
  itemName: string,
  comment: string,
  roomUUID: string
) => {
  const { data, error } = await supabase.from("watchlist").insert({
    title: itemName,
    comment: comment,
    likes: 0,
    room_uuid: roomUUID,
  });

  if (error) {
    throw error;
  }
  return { status: 201, data: data };
};

export const deleteWatchList = async (id: number) => {
  if (window.confirm("アイテムを削除してよろしいですか？")) {
    const { data, error } = await supabase
      .from("watchlist")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
    return { status: 200, data: data };
  }
  return {
    message: "削除処理はキャンセルされました",
  };
};

export const addLikes = async (id: number, currentLikes: number) => {
  const { data, error } = await supabase
    .from("watchlist")
    .update({
      likes: currentLikes + 1,
    })
    .eq("id", id);

  if (error) {
    throw error;
  }
  return { status: 200, data: data };
};

export const useWatchList = (roomUUID: string) => {
  const [watchList, setWatchList] = useState<WatchList | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getWatchList(roomUUID);
      setWatchList(data);
    })();
  }, [watchList]);

  return { watchList };
};
