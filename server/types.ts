import { Types } from "mongoose";

export interface ICreateCoin {
  title: string;
  image: string;
}

export interface IValue {
  _id: Types.ObjectId;
  amount: number;
  date: Date;
}

export interface ICoin extends ICreateCoin {
  _id: Types.ObjectId;
  values: IValue[];
  date: Date;
}
