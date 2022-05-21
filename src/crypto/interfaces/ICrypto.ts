import { Crypto } from '../entities';

export interface ICreateCrypto {
    name: string,
    assetId: string
}

export interface ICreateCryptoHistoryData {
    price: number,
    dateTo: Date,
    dateFrom: Date,
    cryptoMainId: number,
    cryptoAdditionalId: number,
}

export interface ICryptoHistoryData {
    price: number,
    dateTo: Date,
    dateFrom: Date,
    cryptoMainId: Crypto,
    cryptoAdditionalId: Crypto,
}