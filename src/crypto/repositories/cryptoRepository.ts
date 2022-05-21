import { getRepository } from 'typeorm';
import { Crypto } from '../entities';
import { ApiError, defaultHttpErrorMessages } from '../../utils/apiError';
import { ICreateCrypto } from '../interfaces';


export class CryptoRepository {

    static async createCrypto(name: string, assetId: string): Promise<Crypto> {
        const res = await Crypto.create({
            name,
            assetId
        }).save();

        if(!res) {
            throw new ApiError(500, defaultHttpErrorMessages.badRequest);
        }

        return res;
    }

    static async findAndRetrieveCrypto(param: 'id' | 'name' | 'assetId', value: string): Promise<Crypto> {
        
        const res = await getRepository(Crypto)
            .createQueryBuilder('crypto')
            .where(`crypto.${param} = '${value}'`) 
            .getOne();

        if(!res) {
            throw new ApiError(404, defaultHttpErrorMessages.notFound);
        }

        return res;
    }

    static async updateCrypto(param: 'id' | 'name' | 'assetId', value: string, data: Partial<ICreateCrypto>): Promise<void> {
        
        await getRepository(Crypto)
            .createQueryBuilder('crypto')
            .where(`${param} = '${value}'`)
            .update(Crypto)
            .set(data)
            .execute();
    }

    static async deleteCrypto(param: 'id' | 'name' | 'assetId', value: string): Promise<void> {

        await getRepository(Crypto)
            .createQueryBuilder('crypto')
            .where(`crypto.${param} = '${value}'`) 
            .softDelete()
            .execute();
    }

};