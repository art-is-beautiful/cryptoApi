import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCryptoAndPricesTables1653152683367 implements MigrationInterface {
    name = 'CreateCryptoAndPricesTables1653152683367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crypto_history_prices" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "price" numeric NOT NULL, "dateFrom" TIMESTAMP NOT NULL, "dateTo" TIMESTAMP NOT NULL, "cryptoMainId" integer, "cryptoAdditionalId" integer, CONSTRAINT "PK_32a13e263c444886d78b2dd7ff9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crypto" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "assetId" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5084b15a218a51654c1db780d8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "crypto_history_prices" ADD CONSTRAINT "FK_5c7029b392b14e03e717be9415a" FOREIGN KEY ("cryptoMainId") REFERENCES "crypto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "crypto_history_prices" ADD CONSTRAINT "FK_42a8818bb0ba96ad0c4829805ca" FOREIGN KEY ("cryptoAdditionalId") REFERENCES "crypto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crypto_history_prices" DROP CONSTRAINT "FK_42a8818bb0ba96ad0c4829805ca"`);
        await queryRunner.query(`ALTER TABLE "crypto_history_prices" DROP CONSTRAINT "FK_5c7029b392b14e03e717be9415a"`);
        await queryRunner.query(`DROP TABLE "crypto"`);
        await queryRunner.query(`DROP TABLE "crypto_history_prices"`);
    }

}
