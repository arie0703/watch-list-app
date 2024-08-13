export type WatchList = [] |
{
  id: number,
  title: string,
  comment?: string,
  likes: number,
  created_at: string
}[]

export interface WatchListFormInput {
  title: string;
  comment?: string;
}