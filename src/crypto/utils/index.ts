import 'dotenv/config';
import axios from 'axios';

export const axiosRequest = async (path: string) => {
  try {
    return await axios({
        url: `https://rest.coinapi.io/v1${path}`,
        method: 'get',
        headers: {
          'X-CoinAPI-Key': `${process.env.COIN_APP_API}`,
        },
      });
  }
  catch (err) {
    console.log(err);
  }
};

export const arrayPagination = (array: Array<object>, page_size: number, page_number: number): Array<object> => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
};