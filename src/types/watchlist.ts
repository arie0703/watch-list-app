export type WatchList = [] |
{
  id: number,
  title: string,
  comment?: string,
  category: string,
  likes: number,
  created_at: string
}[]

export type WatchListAttribute = {
  uuid: {
    S: string
  },
  name: {
    S: string
  },
  comment: {
    S: string
  }
}