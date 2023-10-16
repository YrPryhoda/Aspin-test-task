class CryptoPriceService {
  async getPrice(coin: string) {
    try {        
        const response = await fetch(`${process.env.REACT_APP_API_URL}&fsym=${coin}`);

        if(!response.ok) {
            throw Error(response.statusText);
        }

        return await response.json()
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export const cryptoPriceService = new CryptoPriceService();
