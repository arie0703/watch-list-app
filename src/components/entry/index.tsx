import { FormProvider, useForm } from "react-hook-form";
import styles from "./entry.module.scss";
import { EntryRoomFormInput, EntryRoomResponse } from "../../types/entryRoom";
import { entryRoom } from "../../libs/room";
import { useCookies } from "react-cookie";

interface EntryProps {
  setCurrentRoom: React.Dispatch<React.SetStateAction<string | null>>;
}

export const Entry = ({ setCurrentRoom }: EntryProps) => {
  const formMethods = useForm<EntryRoomFormInput>();
  const { register, handleSubmit } = formMethods;
  const [_, setCookie] = useCookies();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(async (params: EntryRoomFormInput) => {
      const response: EntryRoomResponse = await entryRoom(
        params.roomName,
        params.roomPass
      );

      // 入室に成功した場合、セッションIDをCookieに保存
      if (response.isSuccess && response.roomUUID) {
        setCookie("session_id", response.sessionId);
        // 親コンポーネントのcurrentRoomにroomUUIDをここでセットしておくことで,kvへの問い合わせを省略する
        setCurrentRoom(response.roomUUID);
      }
      return alert(response.message);
    })();
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <div className={styles["entry-form"]}>
          <input
            className={styles["text-field"]}
            placeholder="Room Name"
            {...register("roomName")}
          ></input>

          <input
            className={styles["text-field"]}
            placeholder="Pass"
            {...register("roomPass")}
          ></input>

          <button className={styles["submit-button"]} type="submit">
            Entry
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
