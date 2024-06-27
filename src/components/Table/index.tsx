import { WatchList } from '../../types/watchlist'
import styles from './table.module.scss'

interface TableProps {
  watchList: WatchList
}

export const Table = ({watchList}: TableProps) => {
  return (
    <table className={styles['table']}>
      <thead>
        <tr>
          <th>Item</th>
          <th>Comment</th>
        </tr>
      </thead>
      {watchList.map((w) => {
        return (
          <tbody>
            <td>{w.item}</td>
            <td>{w.comment}</td>
          </tbody>
        )
      })}
    </table>
  )
}
