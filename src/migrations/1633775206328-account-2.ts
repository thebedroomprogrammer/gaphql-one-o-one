import {MigrationInterface, QueryRunner} from "typeorm";

export class account21633775206328 implements MigrationInterface {
    name = 'account21633775206328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "acc" integer NOT NULL, "aid" integer, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_0b14a6d3a10f229a9b6989d32e3" FOREIGN KEY ("aid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_0b14a6d3a10f229a9b6989d32e3"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
