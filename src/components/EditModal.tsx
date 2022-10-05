import styles from "../styles/EditModal-styles.module.css";
import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import { ChangeEvent, FC, useState } from "react";
import StatusButton from "./StatusButton";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const EditModal = () => {
  const { content, val } = useSelector(
    (state: RootState) => state.editModalData
  );

  const [newVal, setNewVal] = useState(val);

  const changeNewVal = (e: ChangeEvent<HTMLInputElement>) => {
    setNewVal(e.target.value);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <Title color="info" content="Edit" variant="h2" />
        <Form>
          <Input
            content={content}
            type="text"
            value={newVal}
            modifier={changeNewVal}
            required
          />
          <StatusButton action={() => {}} content="Save" status="success" />
        </Form>
      </div>
    </div>
  );
};

export default EditModal;
