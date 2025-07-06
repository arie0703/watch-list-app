import { FormProvider, useForm } from "react-hook-form";
import styles from "./new-room.module.scss";
import Modal from "react-modal";
import { useState } from "react";
import { NewRoomFormInput, NewRoomResponse } from "../../types/newRoom";
import { newRoom } from "../../libs/room";
import { useCookies } from "react-cookie";

interface NewRoomProps {
  setCurrentRoom: React.Dispatch<React.SetStateAction<string | null>>;
}

export const NewRoom = ({ setCurrentRoom }: NewRoomProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [newRoomResponse, setNewRoomResponse] =
    useState<NewRoomResponse | null>(null);

  const formMethods = useForm<NewRoomFormInput>();
  const { register, handleSubmit, reset } = formMethods;
  const [, setCookie] = useCookies();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(async (params: NewRoomFormInput) => {
      const response: NewRoomResponse = await newRoom(params.roomName);

      setNewRoomResponse(response);
      reset();
    })();
  };

  // ルームパスワードをクリップボードにコピーする関数
  const copyPasswordToClipboard = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password);
      alert("ルームパスワードをクリップボードにコピーしました！");
    } catch (err) {
      console.error("クリップボードへのコピーに失敗しました:", err);
      alert(
        "クリップボードへのコピーに失敗しました。手動でコピーしてください。"
      );
    }
  };

  const closeModal = () => {
    // 作成したルームのセッションID, uuidを正常に取得できているのであれば、モーダルクローズ時にcurrentRoomの状態を更新
    if (newRoomResponse?.sessionId && newRoomResponse.roomInfo?.uuid) {
      setCookie("session_id", newRoomResponse.sessionId);
      setCurrentRoom(newRoomResponse.roomInfo.uuid);
    }
    setIsOpen(false);
  };

  return (
    <div className={styles["new-room"]}>
      <button
        className="orange-button-secondary"
        onClick={() => setIsOpen(true)}
      >
        ルームを作成
      </button>

      {/* Modal */}
      <Modal
        className={`modal-item-content ${styles["new-room-modal-content"]}`}
        isOpen={modalIsOpen}
      >
        <button className="modal-close-button" onClick={() => closeModal()}>
          <span className="modal-close"></span>
        </button>
        <p>作成したいルーム名を入力してください。</p>
        <p>(パスワードは自動で生成されます)</p>

        <FormProvider {...formMethods}>
          <form onSubmit={onSubmit}>
            <div className={styles["entry-form"]}>
              <input
                className={styles["text-field"]}
                placeholder="Room Name"
                {...register("roomName")}
              ></input>

              <button
                className="orange-button-primary"
                type="submit"
                disabled={newRoomResponse?.isSuccess}
              >
                ルームを作成
              </button>
            </div>
          </form>
        </FormProvider>

        {/* ルーム作成処理の結果を出力 */}
        {newRoomResponse && (
          <div className={styles["form-message"]}>
            <p>{newRoomResponse.message}</p>

            {newRoomResponse.error && (
              <div>
                <p className={styles["form-message-error"]}>
                  {newRoomResponse.error}
                </p>
              </div>
            )}

            {newRoomResponse.roomInfo && (
              <div className={styles["form-message-pass"]}>
                <p>ルーム名</p>
                <code>{newRoomResponse.roomInfo.name}</code>
                <p>ルームパスワード</p>
                <code>{newRoomResponse.roomInfo.pass}</code>
                <div className={styles["password-actions"]}>
                  <button
                    className="orange-button-secondary"
                    onClick={() =>
                      copyPasswordToClipboard(newRoomResponse.roomInfo!.pass)
                    }
                  >
                    パスワードをコピー
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
