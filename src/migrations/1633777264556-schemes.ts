import {MigrationInterface, QueryRunner} from "typeorm";

export class schemes1633777264556 implements MigrationInterface {
    name = 'schemes1633777264556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "scheme" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_76643bf1d7e629d8bc8af8ac917" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_scheme" ("scheme_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_63796ee28fcd5c53f82c0178a3c" PRIMARY KEY ("scheme_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_adf6417572ef21401e8ea15195" ON "user_scheme" ("scheme_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7c1b3930ab36d3c34b7d1e32e9" ON "user_scheme" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "user_scheme" ADD CONSTRAINT "FK_adf6417572ef21401e8ea151957" FOREIGN KEY ("scheme_id") REFERENCES "scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_scheme" ADD CONSTRAINT "FK_7c1b3930ab36d3c34b7d1e32e92" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_scheme" DROP CONSTRAINT "FK_7c1b3930ab36d3c34b7d1e32e92"`);
        await queryRunner.query(`ALTER TABLE "user_scheme" DROP CONSTRAINT "FK_adf6417572ef21401e8ea151957"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7c1b3930ab36d3c34b7d1e32e9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_adf6417572ef21401e8ea15195"`);
        await queryRunner.query(`DROP TABLE "user_scheme"`);
        await queryRunner.query(`DROP TABLE "scheme"`);
    }

}
