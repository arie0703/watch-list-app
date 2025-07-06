import styles from "./done-items-button.module.scss";

interface DoneItemsButtonProps {
  onClick: () => void;
}

export const DoneItemsButton = ({ onClick }: DoneItemsButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.text}>完了済み一覧</span>
    </button>
  );
};
