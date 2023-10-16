import { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  AppBar,
  Box,
  Toolbar,
  Button,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import { useAppSelector } from "../../store";
import styles from "./styles.module.scss";
import { ICoin } from "./../../../types";
import AddValue from "../AddValue";

interface IProps {
  coins: ICoin[];
  onModalOpen: () => void;
}

export const Header = ({ coins, onModalOpen }: IProps) => {
  const { coinId } = useParams();
  const { coinsList } = useAppSelector((state) => state.coin);
  const [selectedCoin, setSelectedCoin] = useState<ICoin | null>(null);
  const [valueModal, setValueModal] = useState(false);

  const handlerValueModalOpen = () => setValueModal(true);
  const handlerValueModalClose = () => setValueModal(false);

  useEffect(() => {
    if (coinId) {
      const coin = coinsList.find((el) => el._id === coinId);

      if (coin) {
        setSelectedCoin(coin);
      }
    }
  }, [coinId, coinsList]);

  const onSelectChange = (e: SelectChangeEvent) => {
    const id = e.target.value as string;
    const coin = coins.find((el) => el._id === id);

    if (!coin) {
      return;
    }

    setSelectedCoin(coin);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.header}>
          <FormControl sx={{ m: 1, width: 250, mt: 1 }}>
            <Select
              onChange={onSelectChange}
              value={selectedCoin ? selectedCoin.title : "Choose coin"}
              renderValue={(selected) => {
                return selected;
              }}
            >
              <MenuItem>
                <Button fullWidth onClick={onModalOpen}>
                  + Add coin
                </Button>
              </MenuItem>
              {coins.map((el) => (
                <MenuItem value={el._id} key={el._id}>
                  <Link to={`/crypto/${el._id}`} className={styles.link}>
                    <p>{el.title}</p>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6565/6565893.png"
                      alt={el.title}
                      className={styles.img}
                    />
                  </Link>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedCoin && (
            <div className={styles.header__btnBlock}>
              <Button color="inherit" onClick={handlerValueModalOpen}>
                Add Values
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <AddValue open={valueModal} handleClose={handlerValueModalClose} />
    </Box>
  );
};
