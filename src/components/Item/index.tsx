import styles from './item.module.scss'

interface ItemProps {
  name: string;
  comment?: string;
}

export const Item = ({name, comment}: ItemProps) => {
  return (
    <div className={styles["item-container"]}>
      <div className={styles["rating"]}>
        <span className={styles["star"]}>★</span>
        <span className={styles["star"]}>★</span>
        <span className={styles["star"]}>★</span>
        <span className={styles["star"]}>★</span>
        <span className={styles["star"]}>★</span>
      </div>
      <div className={styles["item-content"]}>
        <div className={styles["item-name"]}>{name}</div>
        <div className={styles["item-comment"]}>{comment}</div>
      </div>
    </div>
  )
}
