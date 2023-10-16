import React, { ChangeEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { addCoin } from "../../store/coin/coin.actions";
import { useAppDispatch } from "../../store";
import styles from "./styles.module.scss";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const AddCurrency = ({ open, handleClose }: IProps) => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handlerSubmit = () => {
    if (!value || !value.trim()) {
      return;
    }

    dispatch(
      addCoin({
        title: value,
        image: "test.jpg",
      })
    );

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={styles.modal}
    >
      <Box className={styles.modal__content}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add new currency
        </Typography>
        <TextField variant="outlined" value={value} onChange={onChange} />
        <Button onClick={handlerSubmit}>Submit</Button>
      </Box>
    </Modal>
  );
};

export default AddCurrency;
