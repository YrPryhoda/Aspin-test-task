import { createAsyncThunk } from "@reduxjs/toolkit";
import { coinService } from "../../services/coin.service";
import { ICoin, ICreateCoin, ICreateValue } from "../../../types";

const baseName = "coin";

export const getCoinsList = createAsyncThunk(
  `${baseName}/all`,
  async (_, { rejectWithValue }) => {
    try {
      const coins = await coinService.coinsList();
      return coins || [];
    } catch (error) {}
  }
);

export const addCoin = createAsyncThunk<ICoin, ICreateCoin>(
  `${baseName}/add`,
  async (data, { rejectWithValue }) => {
    try {
      const newCoin = await coinService.addCoin(data);

      return newCoin;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCoinValue = createAsyncThunk<
  ICoin,
  { coinId: string; valueId: string }
>(`${baseName}/value/delete`, async (data, { rejectWithValue }) => {
  try {
    const newCoin = await coinService.deleteValue(data.coinId, data.valueId);

    return newCoin;
  } catch (error) {
    console.log(error);
  }
});

export const addCoinValue = createAsyncThunk<
  ICoin,
  { coinId: string; body: ICreateValue }
>(`${baseName}/value/add`, async (data, { rejectWithValue }) => {
  try {
    const newCoin = await coinService.addValue(data.coinId, data.body);

    return newCoin;
  } catch (error) {
    console.log(error);
  }
});
