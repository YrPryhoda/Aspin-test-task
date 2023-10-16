import { Schema, Types } from "mongoose";
import { ObjectId } from "mongodb";

export const CoinSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  values: {
    type: [{ amount: Number, date: Date }],
    default: [],
  },
  date: { type: Date, default: Date.now },
});
