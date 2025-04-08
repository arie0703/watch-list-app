import {
  addLikes,
  deleteWatchList,
  markItemAsDone,
} from "../../hooks/useWatchList";
import styles from "./item.module.scss";
import likeSvg from "../../assets/like.svg";
import likeFilledSvg from "../../assets/like_filled.svg";
import { useState } from "react";
import Modal from "react-modal";

interface ItemProps {
  id: number;
  name: string;
  comment?: string;
  likes: number;
}

export const Item = ({ id, name, comment, likes }: ItemProps) => {
  const [likeIcon, setLikeIcon] = useState(likeSvg);
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div className={styles["item-container"]}>
      <div className={styles["item-container-inner"]}>
        <div className={styles["like-container"]}>
          <div
            className={styles["like-button"]}
            onClick={() => {
              addLikes(id, likes);
            }}
            onMouseEnter={() => setLikeIcon(likeFilledSvg)}
            onMouseLeave={() => setLikeIcon(likeSvg)}
          >
            <img src={likeIcon} className={styles["like-logo"]} alt="Like" />
          </div>

          <span className={styles["like-number"]}>{likes}</span>
        </div>
      </div>
      <div className={styles["item-content"]} onClick={() => setIsOpen(true)}>
        <div className={styles["item-name"]}>{name}</div>
      </div>

      {/* Modal */}
      <Modal className={styles["modal-item-content"]} isOpen={modalIsOpen}>
        <button
          className={styles["modal-close-button"]}
          onClick={() => setIsOpen(false)}
        >
          <span className={styles["modal-close"]}></span>
        </button>
        <h2 className={styles["modal-item-name"]}>{name}</h2>
        <p>{comment}</p>

        <div className={styles["modal-bottom-container"]}>
          <div className={styles["like-container"]}>
            <div
              className={styles["like-button"]}
              onClick={() => {
                addLikes(id, likes);
              }}
              onMouseEnter={() => setLikeIcon(likeFilledSvg)}
              onMouseLeave={() => setLikeIcon(likeSvg)}
            >
              <img src={likeIcon} className={styles["like-logo"]} alt="Like" />
            </div>

            <span className={styles["like-number"]}>{likes}</span>
          </div>
          <div className={styles["right-button-container"]}>
            <div className={styles["done-button"]}>
              <button
                className={styles["done-button"]}
                onClick={() => markItemAsDone(id)}
              >
                <span>完了済み</span>
              </button>
            </div>
            <div className={styles["delete-button"]}>
              <button
                className={styles["delete-button"]}
                onClick={() => deleteWatchList(id)}
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
