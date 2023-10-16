import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AddCurrency from "../../components/AddCurrency";
import { useAppSelector } from "../../store";
import styles from "./styles.module.scss";

const StartPage = () => {
  const { coinsList } = useAppSelector((state) => state.coin);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handlerCloseModal = () => setModalOpen(false);
  const handlerOpenModal = () => setModalOpen(true);

  useEffect(() => {
    if (coinsList.length) {
      navigate("/crypto");
    }
  }, [navigate, coinsList]);

  return (
    <main className={styles.page}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={styles.header}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Cool Demo CRM</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div className={styles.container}>
        <Button
          variant="outlined"
          className={styles.btn}
          onClick={handlerOpenModal}
        >
          Add currancy
        </Button>
      </div>

      <AddCurrency open={modalOpen} handleClose={handlerCloseModal} />
    </main>
  );
};

export default StartPage;
