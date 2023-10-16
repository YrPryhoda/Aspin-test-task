import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { coinSlice } from "./coin/coin.slice";

export const store = configureStore({
  reducer: {
    coin: coinSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
