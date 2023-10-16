import React, { ChangeEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { format } from "date-fns";

import { addCoinValue } from "../../store/coin/coin.actions";
import { useAppDispatch } from "../../store";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const AddValue = ({ open, handleClose }: IProps) => {
  const { coinId } = useParams();
  const [form, setForm] = useState({
    amount: 0,
    date: format(Date.now(), "yyyy-MM-dd HH:mm"),
  });

  const dispatch = useAppDispatch();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handlerSubmit = () => {
    if (!form.amount) {
      return;
    }

    dispatch(
      addCoinValue({
        coinId: coinId as string,
        body: form,
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
          Add value for currency
        </Typography>
        <TextField
          variant="outlined"
          name="amount"
          type="number"
          value={form.amount}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={onChange}
        />
        <Button onClick={handlerSubmit}>Submit</Button>
      </Box>
    </Modal>
  );
};

export default AddValue;
