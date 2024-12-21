import styles from "./exit-button.module.scss";
import { useCookies } from "react-cookie";

interface ExitButtonProps {
  setCurrentRoom: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ExitButton = ({ setCurrentRoom }: ExitButtonProps) => {
  const [, setCookie] = useCookies();

  const exitRoom = () => {
    // session_idを削除することで、入室状況がリセットされる
    setCookie("session_id", null);
    setCurrentRoom(null);
  };

  return (
    <div className={styles["exit-button"]}>
      <button
        onClick={() => {
          exitRoom();
        }}
      >
        退出する
      </button>
    </div>
  );
};
