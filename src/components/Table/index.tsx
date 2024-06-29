import { AttributeValue } from '@aws-sdk/client-dynamodb'
import styles from './table.module.scss'

interface TableProps {
  watchList: Record<string, AttributeValue>[] | []
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
          <tbody key={w.uuid.S}>
            <tr>
              <td>{w.name.S}</td>
              <td>{w.comment.S}</td>
            </tr>
          </tbody>
        )
      })}
    </table>
  )
}
