import { useState } from "react";
import { addWatchList } from "../../hooks/useWatchList";
import styles from './form.module.scss';

export const Form = () => {
  const [item, setItem] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div className={styles["form"]}>
      <input
        className={styles["text-field"]}
        placeholder="Title"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      >
      </input>

      <input
        className={styles["text-field"]}
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      >
      </input>

      <button onClick={() => addWatchList(item, comment)}>
        Add Item
      </button>
    </div>
  );
}