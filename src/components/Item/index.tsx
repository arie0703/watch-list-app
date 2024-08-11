import { addLikes, deleteWatchList } from '../../hooks/useWatchList';
import styles from './item.module.scss'
import likeSvg from '../../assets/like.svg'
import likeFilledSvg from '../../assets/like_filled.svg'
import { useState } from 'react';

interface ItemProps {
  id: number;
  name: string;
  comment?: string;
  likes: number;
}

export const Item = ({id, name, comment, likes}: ItemProps) => {

  const [likeIcon, setLikeIcon] = useState(likeSvg);

  return (
    <div className={styles["item-container"]}>
      <div className={styles["item-container-inner"]}>
        <div className={styles["like-container"]}>
          <div
            className={styles["like-button"]}
            onClick={() => {addLikes(id, likes)}}
            onMouseEnter={() => setLikeIcon(likeFilledSvg)}
            onMouseLeave={() => setLikeIcon(likeSvg)}
          >
            <img src={likeIcon} className={styles["like-logo"]} alt="Like" />
          </div>

          <span className={styles["like-number"]}>{likes}</span>
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
