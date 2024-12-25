import { addWatchList } from "../../hooks/useWatchList";
import styles from "./form.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { WatchListFormInput } from "../../types/watchlist";

interface FormProps {
  roomUUID: string;
}

export const Form = ({ roomUUID }: FormProps) => {
  const formMethods = useForm<WatchListFormInput>();
  const { register, handleSubmit, reset } = formMethods;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((params: WatchListFormInput) => {
      addWatchList(params.title, params.comment || "", roomUUID);
    })();
    reset();
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <div className={styles["form"]}>
          <input
            className={styles["text-field"]}
            placeholder="タイトル"
            {...register("title")}
          ></input>

          <textarea
            className={`${styles["text-field"]} ${styles["comment"]}`}
            placeholder="コメント(任意)"
            {...register("comment")}
          ></textarea>

          <button className="orange-button-primary" type="submit">
            追加
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
