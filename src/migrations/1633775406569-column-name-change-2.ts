import {MigrationInterface, QueryRunner} from "typeorm";

export class columnNameChange21633775406569 implements MigrationInterface {
    name = 'columnNameChange21633775406569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "social_security" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "social_security" ADD CONSTRAINT "UQ_7cb437cb053b6f937aeee66f02f" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "social_security" ADD CONSTRAINT "FK_7cb437cb053b6f937aeee66f02f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "social_security" DROP CONSTRAINT "FK_7cb437cb053b6f937aeee66f02f"`);
        await queryRunner.query(`ALTER TABLE "social_security" DROP CONSTRAINT "UQ_7cb437cb053b6f937aeee66f02f"`);
        await queryRunner.query(`ALTER TABLE "social_security" DROP COLUMN "user_id"`);
    }

}
