import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateIssue1611256319016 implements MigrationInterface {
  name = 'CreateIssue1611256319016'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "release" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "repo" varchar NOT NULL, "name" varchar NOT NULL, "dueDate" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`
    )
    await queryRunner.query(
      `CREATE TABLE "issue" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer, "releaseId" integer, CONSTRAINT "FK_0afd9b73442e8fcc3c2d13007b6" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION, CONSTRAINT "FK_168f3ee7d0a35d31343f583eaeb" FOREIGN KEY ("releaseId") REFERENCES "release" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "issue"`)
    await queryRunner.query(`DROP TABLE "release"`)
  }
}
