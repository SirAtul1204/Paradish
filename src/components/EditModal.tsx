import styles from "../styles/EditModal-styles.module.css";
import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import { ChangeEvent, FC, useEffect, useState } from "react";
import StatusButton from "./StatusButton";

export interface EditModalProps {
  content: string;
  inputType: "text" | "file";
  handleSave: (val: string) => void;
  handleCancel: () => void;
  newVal: string;
  changeNewVal: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EditModal: FC<EditModalProps> = ({
  content,
  inputType,
  handleSave,
  handleCancel,
  newVal,
  changeNewVal,
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <Title color="info" content="Edit" variant="h2" />
        <Form>
          <Input
            content={content}
            type={inputType}
            value={newVal}
            modifier={changeNewVal}
            required
          />
          <div className={styles.buttonContainer}>
            <StatusButton
              action={() => handleSave(newVal)}
              content="Save"
              status="success"
            />
            <StatusButton
              action={handleCancel}
              content="Cancel"
              status="error"
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditModal;
