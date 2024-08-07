import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { WatchList } from "../types/watchlist";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const getWatchList = async () => {
  const { data, error } = await supabase.from("watchlist").select("*");

  if (error) {
    throw error;
  }
  return data;
};

export const addWatchList = async (
  itemName: string,
  comment: string,
  category: string
) => {
  const { data, error } = await supabase.from("watchlist").insert({
    title: itemName,
    comment: comment,
    category: category,
    likes: 0,
  });

  if (error) {
    throw error;
  }
  return { status: 201, data: data };
};

export const deleteWatchList = async (id: number) => {
  const { data, error } = await supabase
    .from("watchlist")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
  return { status: 200, data: data };
};

export const useWatchList = () => {
  const [watchList, setWatchList] = useState<WatchList | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getWatchList();
      setWatchList(data);
    })();
  }, [watchList]);

  return { watchList };
};