import { Coin } from "./../models/coin";
import { ICreateCoin, IValue } from "../../types";
import { ObjectId } from "mongodb";

class CoinService {
  async all() {
    return Coin.find();
  }

  async create(data: ICreateCoin) {
    return Coin.create(data);
  }

  async byId(id: string) {
    return Coin.findById(id);
  }

  async byName(title: string) {
    return Coin.findOne({ title });
  }

  async addValue(coinId: string, newValue: IValue) {
    const coin = await this.byId(coinId);

    if (!coin) {
      throw Error("Not found");
    }

    coin.values.push(newValue);

    return await coin.save();
  }

  async deleteValue(coinId: string, valueId: string) {
    const coin = await this.byId(coinId);

    if (!coin) {
      throw Error("Not found");
    }

    const newValues = coin.values.filter((val) => {
      // @ts-ignore
      return val._id.toString() !== valueId;
    });

    coin.values = newValues;
    return await coin.save();
  }
}

export const coinService = new CoinService();
