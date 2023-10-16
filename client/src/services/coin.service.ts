import { ICreateCoin, ICreateValue } from "../../types";

class CoinService {
  protected baseUrl = process.env.REACT_APP_SERVER_API as string;

  async coinsList() {
    const response = await fetch(`${this.baseUrl}/crypto/all`);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  }

  async getById(id: string) {
    const response = await fetch(`${this.baseUrl}/crypto/${id}`);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  }

  async addCoin(data: ICreateCoin) {
    const response = await fetch(`${this.baseUrl}/crypto/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  }

  async deleteValue(coinId: string, valueId: string) {
    const response = await fetch(
      `${this.baseUrl}/crypto/${coinId}/${valueId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  }

  async addValue(coinId: string, data: ICreateValue) {
    const response = await fetch(`${this.baseUrl}/crypto/${coinId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  }
}

export const coinService = new CoinService();
