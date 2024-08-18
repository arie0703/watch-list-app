
import { FormProvider, useForm } from "react-hook-form";
import styles from "./entry.module.scss";
import { EntryRoomFormInput, EntryRoomResponse } from "../../types/entryRoom";
import { entryRoom } from "../../libs/room";

export const Entry = () => {
  const formMethods = useForm<EntryRoomFormInput>();
  const { register, handleSubmit } = formMethods;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(async (params: EntryRoomFormInput) => {
      const response: EntryRoomResponse = await entryRoom(params.roomName, params.roomPass);
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

          <button className={styles["submit-button"]} type="submit">Entry</button>
        </div>
      </form>
    </FormProvider>
  );
};