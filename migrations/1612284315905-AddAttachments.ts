import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddAttachments1612284315905 implements MigrationInterface {
  name = 'AddAttachments1612284315905'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attachment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL, "filepath" varchar NOT NULL, "mime" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "issueId" integer NOT NULL, CONSTRAINT "FK_54f51431f696f4d3b8436475e88" FOREIGN KEY ("issueId") REFERENCES "issue" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "attachment"`)
  }
}
