import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntities1728337390690 implements MigrationInterface {
  name = 'CreateEntities1728337390690';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "phone" character varying(20), "form_number" character varying(50) NOT NULL, "address" character varying(255), "registration_date" date NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`COMMENT ON TABLE "users" IS 'Користувачі'`);
    await queryRunner.query(
      `CREATE TABLE "employees" ("id" SERIAL NOT NULL, "position" character varying(100) NOT NULL, "hire_date" date NOT NULL, "role" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "user_id" integer, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`COMMENT ON TABLE "employees" IS 'Працівники'`);
    await queryRunner.query(
      `CREATE TABLE "books" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "is_available" boolean NOT NULL DEFAULT true, "isbn" character varying(13), "author" character varying(255), "publisher" character varying(255), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`COMMENT ON TABLE "books" IS 'Книги'`);
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "status" character varying(20) NOT NULL, "comment" text, "borrow_date" date NOT NULL, "return_date" date, "book_id" integer, "user_id" integer, "librarian_id" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`COMMENT ON TABLE "transactions" IS 'Транзакції'`);
    await queryRunner.query(
      `CREATE TABLE "book_genre" ("book_id" integer NOT NULL, "genre_code" character varying NOT NULL, CONSTRAINT "PK_c380980a1179f662e93fe249da9" PRIMARY KEY ("book_id", "genre_code"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa09ea26c5837f4f4160ae5571" ON "book_genre" ("book_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_550991fd8a96c600e901cce718" ON "book_genre" ("genre_code") `,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_74f5550d011d85784a22e4dbf1c" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_734a6f1fc3a1643d9f55c5c099a" FOREIGN KEY ("librarian_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_genre" ADD CONSTRAINT "FK_fa09ea26c5837f4f4160ae55715" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_genre" ADD CONSTRAINT "FK_550991fd8a96c600e901cce7181" FOREIGN KEY ("genre_code") REFERENCES "dict_genres"("code") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book_genre" DROP CONSTRAINT "FK_550991fd8a96c600e901cce7181"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_genre" DROP CONSTRAINT "FK_fa09ea26c5837f4f4160ae55715"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_734a6f1fc3a1643d9f55c5c099a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_74f5550d011d85784a22e4dbf1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_550991fd8a96c600e901cce718"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fa09ea26c5837f4f4160ae5571"`,
    );
    await queryRunner.query(`DROP TABLE "book_genre"`);
    await queryRunner.query(`COMMENT ON TABLE "transactions" IS NULL`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`COMMENT ON TABLE "books" IS NULL`);
    await queryRunner.query(`DROP TABLE "books"`);
    await queryRunner.query(`COMMENT ON TABLE "employees" IS NULL`);
    await queryRunner.query(`DROP TABLE "employees"`);
    await queryRunner.query(`COMMENT ON TABLE "users" IS NULL`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
