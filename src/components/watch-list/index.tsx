import styles from "./watch-list.module.scss";

import { useWatchList } from "../../hooks/useWatchList";
import { Item } from "../Item";

interface WatchListProps {
  roomUUID: string;
}

export const WatchList = ({ roomUUID }: WatchListProps) => {
  const { watchList } = useWatchList(roomUUID);

  return (
    <div className={styles["watch-list"]}>
      <div className={styles["watch-list-grid-container"]}>
        {watchList &&
          watchList.map((w) => {
            return (
              <Item
                key={w.id}
                id={w.id}
                name={w.title}
                comment={w.comment || ""}
                likes={w.likes}
              />
            );
          })}
      </div>
    </div>
  );
};
