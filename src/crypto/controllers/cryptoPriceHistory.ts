import { Context } from 'koa';
import { CryptoRepository } from '../repositories/cryptoRepository';
import { CryptoPriceHistoryRepository } from '../repositories/cryptoPriceHistoryRepository';
import { ICreateCryptoHistoryData } from '../interfaces';


class Controller {

    static createCryptoCurrencyHistoryPriceExrate = async (ctx: Context): Promise<void> => {

        const data: ICreateCryptoHistoryData = ctx.request.body;

        const cryptoMain = await CryptoRepository.findAndRetrieveCrypto('id', data.cryptoMainId.toString());
        const cryptoAdditional = await CryptoRepository.findAndRetrieveCrypto('id', data.cryptoAdditionalId.toString());

        const res = await CryptoPriceHistoryRepository.createCryptoHistoryPrices(data.price, data.dateFrom, data.dateTo, cryptoMain, cryptoAdditional);

        ctx.status = 200;
        ctx.body = res;
        
    };

    static updateCryptoCurrencyHistoryPriceExrate = async (ctx: Context): Promise<void> => {

        const id = ctx.request.params.id as string;

        const data: Partial<ICreateCryptoHistoryData> = ctx.request.body;

        await CryptoPriceHistoryRepository.findAndRetrieveCryptoHistoryPrices(id);

        await CryptoPriceHistoryRepository.updateCryptoHistoryPrices(id, data);

        const res = await CryptoPriceHistoryRepository.findAndRetrieveCryptoHistoryPrices(id);

        ctx.status = 200;
        ctx.body = res;
        
    };

    static retrieveCryptoCurrencyHistoryPriceExrate = async (ctx: Context): Promise<void> => {

        const id = ctx.request.params.id as string;

        const res = await CryptoPriceHistoryRepository.findAndRetrieveCryptoHistoryPrices(id);

        ctx.status = 200;
        ctx.body = res;
        
    };

    static deleteCryptoCurrencyHistoryPriceExrate = async (ctx: Context): Promise<void> => {

        const id = ctx.request.params.id as string;

        await CryptoPriceHistoryRepository.findAndRetrieveCryptoHistoryPrices(id);

        await CryptoPriceHistoryRepository.deleteCryptoHistoryPrices(id);

        ctx.status = 204;  
    };
}

export default Controller;