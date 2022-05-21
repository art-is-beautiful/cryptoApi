import { Context } from 'koa';
import { axiosRequest, arrayPagination } from '../utils';
import { liveSocketCurrencRate } from '../services/cryptoService';
import { CryptoRepository } from '../repositories/cryptoRepository';
import { ICreateCrypto } from '../interfaces';


class Controller {

    static retrieveListCryptoCurrency = async (ctx: Context): Promise<void> => {
       
        const page = Number(ctx.request.query.page) || 1;
        const limit = Number(ctx.request.query.limit) || 10;

        const axiosResponse = await axiosRequest(ctx.request.path.slice(7));

        let data = axiosResponse?.data;

        if (data.length === 0) {
            ctx.status = 204;
            return;
        }

        data = data.map((currency: any) => {
            return {
                asset_id: currency.asset_id,
                name: currency.name
            };
        });


        if (page && limit) {
            data = arrayPagination(data, limit, page);
        }

        ctx.status = 200;
        ctx.body = data;
    };

    static retrieveWSCryptoCurrency = async (ctx: Context): Promise<void> => {

        const { currency1, currency2 }: { currency1?: string; currency2?: string } = ctx.request.params;

        await liveSocketCurrencRate(currency1, currency2);

        ctx.body = {
            message: 'Please open the console in which this application is running :)'
        };
    };

    static createCryptoCurrencyAsset = async (ctx: Context): Promise<void> => {

        const data: ICreateCrypto = ctx.request.body;

        const res = await CryptoRepository.createCrypto(data.name, data.assetId);

        ctx.status = 200;
        ctx.body = res;
        
    };

    static updateCryptoCurrencyAsset = async (ctx: Context): Promise<void> => {

        const id = ctx.request.params.id as string;

        const data: Partial<ICreateCrypto> = ctx.request.body;

        await CryptoRepository.findAndRetrieveCrypto('id', id);

        await CryptoRepository.updateCrypto('id', id, data);

        const res = await CryptoRepository.findAndRetrieveCrypto('id', id);

        ctx.status = 200;
        ctx.body = res;
        
    };

    static retrieveCryptoCurrencyAsset = async (ctx: Context): Promise<void> => {

        const id = ctx.request.params.id as string;

        const res = await CryptoRepository.findAndRetrieveCrypto('id', id);

        ctx.status = 200;
        ctx.body = res;
        
    };

    static deleteCryptoCurrencyAsset = async (ctx: Context): Promise<void> => {

        const id = ctx.request.params.id as string;

        await CryptoRepository.findAndRetrieveCrypto('id', id);

        await CryptoRepository.deleteCrypto('id', id);

        ctx.status = 204;
    };
}

export default Controller;