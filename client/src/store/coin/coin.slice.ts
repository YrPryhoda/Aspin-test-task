import { createSlice } from "@reduxjs/toolkit";

import { addCoin, addCoinValue, deleteCoinValue, getCoinsList } from "./coin.actions";
import { ICoin } from "../../../types";

interface CoinState {
  selectedCoin: string | null;
  coinsList: ICoin[];
  loading: boolean;
}

const initialState: CoinState = {
  loading: false,
  selectedCoin: null,
  coinsList: [],
};

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getCoinsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoinsList.fulfilled, (state, action) => {
        state.loading = false;
        state.coinsList = action.payload;
      })
      .addCase(getCoinsList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCoin.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCoin.fulfilled, (state, action) => {
        state.loading = false;
        state.coinsList.push(action.payload);
      })
      .addCase(addCoin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCoinValue.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCoinValue.fulfilled, (state, action) => {
        state.loading = false;

        const id = action.payload._id;
        const coin = state.coinsList.find(el => el._id === id);

        if(!coin) {
          return
        }

        coin.values = action.payload.values;
      })
      .addCase(addCoinValue.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteCoinValue.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoinValue.fulfilled, (state, action) => {
        state.loading = false;

        const coin = state.coinsList.find(
          (el) => el._id === action.payload._id
        );

        if (!coin) {
          return;
        }

        coin.values = action.payload.values;
      })
      .addCase(deleteCoinValue.rejected, (state) => {
        state.loading = false;
      }),
});
