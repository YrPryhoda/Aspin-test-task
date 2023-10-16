import { model } from "mongoose";
import { CoinSchema } from "./schema";

export const Coin = model("Coin", CoinSchema);