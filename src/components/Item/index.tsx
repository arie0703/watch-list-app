import { deleteWatchList } from '../../hooks/useWatchList';
import styles from './item.module.scss'

interface ItemProps {
  id: number;
  name: string;
  comment?: string;
}

export const Item = ({id, name, comment}: ItemProps) => {
  return (
    <div className={styles["item-container"]}>
      <div className={styles["item-container-inner"]}>
        <div className={styles["rating"]}>
          <span className={styles["star"]}>★</span>
          <span className={styles["star"]}>★</span>
          <span className={styles["star"]}>★</span>
          <span className={styles["star"]}>★</span>
          <span className={styles["star"]}>★</span>
        </div>
        <div className={styles["delete-button"]}>
          <button className={styles["delete-button"]} onClick={() => deleteWatchList(id)}>
            <span className={styles["dli-minus"]}></span>
          </button>
        </div>
      </div>
      <div className={styles["item-content"]}>
        <div className={styles["item-name"]}>{name}</div>
        <div className={styles["item-comment"]}>{comment}</div>
      </div>
    </div>
  )
}
