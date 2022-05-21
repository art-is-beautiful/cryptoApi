import { Entity, Column, ManyToOne } from 'typeorm';
import { GeneralFields } from './generalFields';
import { Crypto } from './crypto';


@Entity()
export class CryptoHistoryPrices extends GeneralFields {

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'timestamp', nullable: false })
  dateFrom: Date;

  @Column({ type: 'timestamp', nullable: false })
  dateTo: Date;

  @ManyToOne(() => Crypto, cryptoMain => cryptoMain.cryptoHistoryPricesMain)
  cryptoMain: Crypto;

  @ManyToOne(() => Crypto, cryptoAdditional => cryptoAdditional.cryptoHistoryPricesAdditional)
  cryptoAdditional: Crypto;

}