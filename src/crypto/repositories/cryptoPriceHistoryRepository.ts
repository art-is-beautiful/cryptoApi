import { getRepository } from 'typeorm';
import { CryptoHistoryPrices, Crypto } from '../entities';
import { ApiError, defaultHttpErrorMessages } from '../../utils/apiError';
import { ICreateCryptoHistoryData } from '../interfaces';


export class CryptoPriceHistoryRepository {

    static async createCryptoHistoryPrices(price: number, dateFrom: Date, dateTo: Date, cryptoMain: Crypto, cryptoAdditional: Crypto): Promise<CryptoHistoryPrices> {
        const res = await CryptoHistoryPrices.create({
            price,
            dateFrom,
            dateTo,
            cryptoMain,
            cryptoAdditional
        }).save();

        if(!res) {
            throw new ApiError(500, defaultHttpErrorMessages.badRequest);
        }

        return res;
    }

    static async findAndRetrieveCryptoHistoryPrices(value: string): Promise<CryptoHistoryPrices> {
        
        const res = await getRepository(CryptoHistoryPrices)
            .createQueryBuilder('cryptoHistoryPrices')
            .leftJoinAndSelect('cryptoHistoryPrices.cryptoMain', 'cryptoMain')
            .leftJoinAndSelect('cryptoHistoryPrices.cryptoAdditional', 'cryptoAdditional')
            .where(`cryptoHistoryPrices.id = '${value}'`) 
            .getOne();

        if(!res) {
            throw new ApiError(404, defaultHttpErrorMessages.notFound);
        }

        return res;
    }

    static async updateCryptoHistoryPrices(value: string, data: Partial<ICreateCryptoHistoryData>): Promise<void> {
        
        await getRepository(CryptoHistoryPrices)
            .createQueryBuilder('cryptoHistoryPrices')
            .where(`id = '${value}'`)
            .update(CryptoHistoryPrices)
            .set(data)
            .execute();
    }

    static async deleteCryptoHistoryPrices(value: string): Promise<void> {

        await getRepository(CryptoHistoryPrices)
            .createQueryBuilder('cryptoHistoryPrices')
            .where(`id = '${value}'`) 
            .softDelete()
            .execute();
    }

};