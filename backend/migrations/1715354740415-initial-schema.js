const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitialSchema1715354740415 {
    name = 'InitialSchema1715354740415'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "label" character varying NOT NULL, "value" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "publisher" character varying NOT NULL, "released" character varying NOT NULL, "description" character varying NOT NULL, "slug" character varying NOT NULL, "background_image" character varying NOT NULL, "clip" character varying, "rating" numeric(10,2) NOT NULL, "metacritic" integer NOT NULL, "gallery" json NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "platform" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "label" character varying NOT NULL, "value" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "PK_c33d6abeebd214bd2850bfd6b8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."account_role_enum" AS ENUM('customer', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."account_status_enum" AS ENUM('active', 'suspended', 'pending', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."account_role_enum" NOT NULL DEFAULT 'customer', "status" "public"."account_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game_genres_genre" ("gameId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_4d9817701d31359977772ad19d2" PRIMARY KEY ("gameId", "genreId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2ae1c183b1ca4b831efcb9e673" ON "game_genres_genre" ("gameId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3549c373e01bdee0f24ed47649" ON "game_genres_genre" ("genreId") `);
        await queryRunner.query(`CREATE TABLE "game_platforms_platform" ("gameId" integer NOT NULL, "platformId" integer NOT NULL, CONSTRAINT "PK_c1ca4cb0aecf11874462fb18d93" PRIMARY KEY ("gameId", "platformId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_552929816b601dba123ca67fac" ON "game_platforms_platform" ("gameId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5cc01d015d6bea3c04251c67da" ON "game_platforms_platform" ("platformId") `);
        await queryRunner.query(`ALTER TABLE "game_genres_genre" ADD CONSTRAINT "FK_2ae1c183b1ca4b831efcb9e673d" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "game_genres_genre" ADD CONSTRAINT "FK_3549c373e01bdee0f24ed476497" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_platforms_platform" ADD CONSTRAINT "FK_552929816b601dba123ca67facf" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "game_platforms_platform" ADD CONSTRAINT "FK_5cc01d015d6bea3c04251c67daa" FOREIGN KEY ("platformId") REFERENCES "platform"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "game_platforms_platform" DROP CONSTRAINT "FK_5cc01d015d6bea3c04251c67daa"`);
        await queryRunner.query(`ALTER TABLE "game_platforms_platform" DROP CONSTRAINT "FK_552929816b601dba123ca67facf"`);
        await queryRunner.query(`ALTER TABLE "game_genres_genre" DROP CONSTRAINT "FK_3549c373e01bdee0f24ed476497"`);
        await queryRunner.query(`ALTER TABLE "game_genres_genre" DROP CONSTRAINT "FK_2ae1c183b1ca4b831efcb9e673d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5cc01d015d6bea3c04251c67da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_552929816b601dba123ca67fac"`);
        await queryRunner.query(`DROP TABLE "game_platforms_platform"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3549c373e01bdee0f24ed47649"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2ae1c183b1ca4b831efcb9e673"`);
        await queryRunner.query(`DROP TABLE "game_genres_genre"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "public"."account_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_role_enum"`);
        await queryRunner.query(`DROP TABLE "platform"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "genre"`);
    }
}
