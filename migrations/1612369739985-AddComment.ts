import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddComment1612369739985 implements MigrationInterface {
  name = 'AddComment1612369739985'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "issueId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "FK_c91b5a63310845bdeca63d9ee13" FOREIGN KEY ("issueId") REFERENCES "issue" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "comment"`)
  }
}
