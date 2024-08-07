export type WatchList = [] |
{
  id: number,
  title: string,
  comment?: string,
  category: string,
  likes: number,
  created_at: string
}[]

export interface WatchListFormInput {
  title: string;
  comment?: string;
  category: string;
}