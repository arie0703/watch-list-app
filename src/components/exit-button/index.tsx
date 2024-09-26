import styles from "./exit-button.module.scss";
import { useCookies } from "react-cookie";

export const ExitButton = () => {
  const [_, setCookie] = useCookies();

  const exitRoom = () => {
    // session_idを削除することで、入室状況がリセットされる
    setCookie("session_id", null);
    console.log("セッションが取り消されました");
  };

  return (
    <div className={styles["exit-button"]}>
      <button
        onClick={() => {
          exitRoom();
        }}
      >
        Exit Room
      </button>
    </div>
  );
};
