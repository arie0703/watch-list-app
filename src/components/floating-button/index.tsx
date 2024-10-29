import { Form } from "../form";
import styles from "./floating-button.module.scss";
import Modal from "react-modal";
import { useState } from "react";

interface FloatingButtonProps {
  roomUUID: string;
}

export const FloatingButton = ({ roomUUID }: FloatingButtonProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  return (
    <div className={styles["floating-button"]}>
      <button onClick={() => setIsOpen(true)}>
        <span className={styles["dli-plus"]}></span>
      </button>

      {/* Modal */}
      <Modal className={styles["modal-item-content"]} isOpen={modalIsOpen}>
        <button
          className={styles["modal-close-button"]}
          onClick={() => setIsOpen(false)}
        >
          <span className={styles["modal-close"]}></span>
        </button>
        <Form roomUUID={roomUUID} />
      </Modal>
    </div>
  );
};
