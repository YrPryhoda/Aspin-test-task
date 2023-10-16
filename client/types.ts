export interface ICreateValue {
  amount: number;
  date: string;
}

export interface IValue extends ICreateValue {
  _id: string;
}

export interface ICreateCoin {
  title: string;
  image: string;
}

export interface ICoin extends ICreateCoin {
  _id: string;
  date: string;
  values: IValue[];
}
