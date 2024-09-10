import { addWatchList } from "../../hooks/useWatchList";
import styles from "./form.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { WatchListFormInput } from "../../types/watchlist";

export const Form = () => {
  const formMethods = useForm<WatchListFormInput>();
  const { register, handleSubmit, reset } = formMethods;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((params: WatchListFormInput) => {
      addWatchList(params.title, params.comment || "");
    })();
    reset();
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <div className={styles["form"]}>
          <input
            className={styles["text-field"]}
            placeholder="Title"
            {...register("title")}
          ></input>

          <textarea
            className={`${styles["text-field"]} ${styles["comment"]}`}
            placeholder="Comment"
            {...register("comment")}
          ></textarea>

          <button className={styles["submit-button"]} type="submit">Add</button>
        </div>
      </form>
    </FormProvider>
  );
};
