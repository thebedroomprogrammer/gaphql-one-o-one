import {MigrationInterface, QueryRunner} from "typeorm";

export class columnNameChange1633775348113 implements MigrationInterface {
    name = 'columnNameChange1633775348113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_0b14a6d3a10f229a9b6989d32e3"`);
        await queryRunner.query(`ALTER TABLE "social_security" DROP CONSTRAINT "FK_ab1a06928fd321b787cd1b399ac"`);
        await queryRunner.query(`ALTER TABLE "account" RENAME COLUMN "aid" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "social_security" DROP CONSTRAINT "REL_ab1a06928fd321b787cd1b399a"`);
        await queryRunner.query(`ALTER TABLE "social_security" DROP COLUMN "uid"`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`);
        await queryRunner.query(`ALTER TABLE "social_security" ADD "uid" integer`);
        await queryRunner.query(`ALTER TABLE "social_security" ADD CONSTRAINT "REL_ab1a06928fd321b787cd1b399a" UNIQUE ("uid")`);
        await queryRunner.query(`ALTER TABLE "account" RENAME COLUMN "user_id" TO "aid"`);
        await queryRunner.query(`ALTER TABLE "social_security" ADD CONSTRAINT "FK_ab1a06928fd321b787cd1b399ac" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_0b14a6d3a10f229a9b6989d32e3" FOREIGN KEY ("aid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
