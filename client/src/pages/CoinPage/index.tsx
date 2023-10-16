import { useOutletContext, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { cryptoPriceService } from "../../services/crypto.price.service";
import { deleteCoinValue } from "../../store/coin/coin.actions";
import { coinService } from "../../services/coin.service";
import AddCurrency from "../../components/AddCurrency";
import BarChart from "../../components/BarChart";
import { useAppDispatch } from "../../store";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { ICoin } from "../../../types";

const CryptoPage = () => {
  const [addCoinModalOpen, setAddCoinModalOpen] = useOutletContext<any>();
  const [currentPrice, setCurrentPrice] = useState("");
  const [priceLoaded, setPriceLoaded] = useState(false);
  const [coinLoaded, setCoinLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [coin, setCoin] = useState<ICoin | null>(null);
  const { coinId } = useParams();
  const dispatch = useAppDispatch();

  const handlerCloseAddModal = () => setAddCoinModalOpen(false);
  const handlerValueDelete = (valueId: string) => {
    dispatch(deleteCoinValue({ coinId: coinId as string, valueId }));
  };

  useEffect(() => {
    coinService
      .getById(coinId as string)
      .then((data) => setCoin(data))
      .catch((err) => setError(err))
      .finally(() => setCoinLoaded(true));
  }, [coinId]);

  useEffect(() => {
    if (!coin) {
      return;
    }

    cryptoPriceService
      .getPrice(coin.title)
      .then((data) => {
        const price = data["USDT"];

        if (!price) {
          throw Error("NotFound");
        }
        setCurrentPrice(data["USDT"]);
      })
      .catch((error) => {
        setCurrentPrice(error.message);
      })
      .finally(() => {
        setPriceLoaded(true);
      });
  }, [coin]);

  const priceJSX = priceLoaded ? (
    <h3 className={styles.price__title}>
      Last loaded price {currentPrice} USDT
    </h3>
  ) : (
    <p className={styles.price__loading}> Data loading ...</p>
  );

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!coin) {
    return <p> Loading ...</p>;
  }

  if (coinLoaded && !coin) {
    return <p>Data not found, sorry</p>;
  }

  return (
    <div>
      <div className={styles.price}>{priceJSX}</div>
      <div className={styles.content}>
        <div className={styles.chart}>
          <BarChart values={coin.values} title={coin.title} />
        </div>
        <div className={styles.table}>
          <Table values={coin.values} handlerDelete={handlerValueDelete} />
        </div>
      </div>
      <AddCurrency open={addCoinModalOpen} handleClose={handlerCloseAddModal} />
    </div>
  );
};

export default CryptoPage;
