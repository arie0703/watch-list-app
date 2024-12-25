import styles from "./hint.module.scss";
import { useState } from "react";

export const Hint = () => {

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles["hint"]}>
      <button
        onClick={() => toggleVisibility()}
      >
        {isVisible && <>▲</> || <>▼</>} 
        やりたいリストとは？
      </button>


      {isVisible && 
        <div className={styles["hint-message"]}>
          <p>やりたいことリストは知人と「やってみたいこと」をシェアするサービスです。</p>
          <p>会員登録不要で、ルームを作成しルーム名とパスワードを知人間でシェアするだけで簡単に利用できます。</p>

          <b className={styles["caution"]}>[注意] 個人情報等センシティブな情報は投稿しないでください。</b>
        </div>
      }
      
    </div>
  );
};
