import { Entity, Column, OneToMany } from 'typeorm';
import { GeneralFields } from './generalFields';
import { CryptoHistoryPrices } from './cryptoHistoryPrices';


@Entity()
export class Crypto extends GeneralFields {

  @Column({ nullable: false })
  assetId: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => CryptoHistoryPrices, cryptoHistoryPrices => cryptoHistoryPrices.cryptoMain)
  cryptoHistoryPricesMain: CryptoHistoryPrices[];

  @OneToMany(() => CryptoHistoryPrices, cryptoHistoryPrices => cryptoHistoryPrices.cryptoAdditional)
  cryptoHistoryPricesAdditional: CryptoHistoryPrices[];

}