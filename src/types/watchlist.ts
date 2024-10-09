export type WatchList = [] |
{
  id: number
  title: string
  comment?: string
  likes: number
  created_at: string
  room_uuid: string
}[]

export interface WatchListFormInput {
  title: string;
  comment?: string;
}