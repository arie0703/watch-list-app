export type WatchList = [] | {item: string, comment?: string}[]

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