import { MigrationInterface, QueryRunner } from "typeorm";

export class ss1633774366687 implements MigrationInterface {
    name = "ss1633774366687";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "social_security" ("id" SERIAL NOT NULL, "identity" integer NOT NULL, "uid" integer, CONSTRAINT "REL_ab1a06928fd321b787cd1b399a" UNIQUE ("uid"), CONSTRAINT "PK_96add902d75d22c9c5992c662ce" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "social_security" ADD CONSTRAINT "FK_ab1a06928fd321b787cd1b399ac" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "social_security" DROP CONSTRAINT "FK_ab1a06928fd321b787cd1b399ac"`
        );
        await queryRunner.query(`DROP TABLE "social_security"`);
    }
}
