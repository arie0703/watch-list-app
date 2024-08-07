// import { useState } from "react";
import { addWatchList } from "../../hooks/useWatchList";
import styles from "./form.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { WatchListFormInput } from "../../types/watchlist";

export const Form = () => {
  const formMethods = useForm<WatchListFormInput>();
  const { register, handleSubmit } = formMethods;

  // const [item, setItem] = useState("");
  // const [comment, setComment] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((params: WatchListFormInput) => {
      addWatchList(params.title, params.comment || "", params.category);
    })();
    // setItem("");
    // setComment("");
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

          <input
            className={styles["text-field"]}
            placeholder="Comment"
            {...register("comment")}
          ></input>

          <select
            className={styles["select-category"]}
            {...register("category")}
          >
            <option value="Event">イベント</option>
            <option value="Product">モノ</option>
          </select>

          <button type="submit">Add</button>
        </div>
      </form>
    </FormProvider>
  );
};