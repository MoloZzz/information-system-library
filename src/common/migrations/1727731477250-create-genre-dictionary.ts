import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGenreDictionary1727731477250 implements MigrationInterface {
  name = 'CreateGenreDictionary1727731477250';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dict_genres" ("code" character varying NOT NULL, "label" character varying NOT NULL, "descriprion" character varying, CONSTRAINT "PK_2def613e983204dd2ee3959b627" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `COMMENT ON TABLE "dict_genres" IS 'Довідник жанрів'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON TABLE "dict_genres" IS NULL`);
    await queryRunner.query(`DROP TABLE "dict_genres"`);
  }
}
