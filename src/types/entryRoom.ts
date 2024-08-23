import { PostgrestError } from "@supabase/supabase-js";

export interface EntryRoomFormInput {
  roomName: string;
  roomPass: string;
}

export interface EntryRoomResponse {
  status: number;
  message: string;
  isSuccess: boolean;
  sessionId?: string;
  error?: string | PostgrestError;
}