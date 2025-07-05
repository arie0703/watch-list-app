import { useState, useEffect } from "react";
import styles from "./done-items-modal.module.scss";
import { getDoneWatchList } from "../../hooks/useWatchList";
import { WatchList } from "../../types/watchlist";
import likeFilledSvg from "../../assets/like_filled.svg";

interface DoneItemsModalProps {
  roomUUID: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DoneItemsModal = ({
  roomUUID,
  isOpen,
  onClose,
}: DoneItemsModalProps) => {
  const [doneItems, setDoneItems] = useState<WatchList | null>(null);

  useEffect(() => {
    if (isOpen) {
      (async () => {
        const data = await getDoneWatchList(roomUUID);
        setDoneItems(data);
      })();
    }
  }, [isOpen, roomUUID]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>完了済みアイテム</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.content}>
          {doneItems && doneItems.length > 0 ? (
            <div className={styles.itemsList}>
              {doneItems.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemTitle}>{item.title}</div>
                  {item.comment && (
                    <div className={styles.itemComment}>{item.comment}</div>
                  )}
                  <div className={styles.itemLikes}>
                    <img
                      src={likeFilledSvg}
                      className={styles.likeIcon}
                      alt="Like"
                    />
                    <span>{item.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              完了済みのアイテムはありません
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
