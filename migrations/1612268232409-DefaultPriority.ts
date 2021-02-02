import {MigrationInterface, QueryRunner} from "typeorm";

export class DefaultPriority1612268232409 implements MigrationInterface {
    name = 'DefaultPriority1612268232409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_issue" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "repo" varchar NOT NULL, "type" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('to do'), "priority" integer NOT NULL DEFAULT (0), "title" varchar NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer NOT NULL, "releaseId" integer NOT NULL, "points" integer NOT NULL DEFAULT (0), CONSTRAINT "FK_168f3ee7d0a35d31343f583eaeb" FOREIGN KEY ("releaseId") REFERENCES "release" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION, CONSTRAINT "FK_0afd9b73442e8fcc3c2d13007b6" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_issue"("id", "repo", "type", "status", "priority", "title", "description", "createdAt", "updatedAt", "authorId", "releaseId", "points") SELECT "id", "repo", "type", "status", "priority", "title", "description", "createdAt", "updatedAt", "authorId", "releaseId", "points" FROM "issue"`);
        await queryRunner.query(`DROP TABLE "issue"`);
        await queryRunner.query(`ALTER TABLE "temporary_issue" RENAME TO "issue"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "issue" RENAME TO "temporary_issue"`);
        await queryRunner.query(`CREATE TABLE "issue" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "repo" varchar NOT NULL, "type" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('to do'), "priority" integer NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer NOT NULL, "releaseId" integer NOT NULL, "points" integer NOT NULL DEFAULT (0), CONSTRAINT "FK_168f3ee7d0a35d31343f583eaeb" FOREIGN KEY ("releaseId") REFERENCES "release" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION, CONSTRAINT "FK_0afd9b73442e8fcc3c2d13007b6" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "issue"("id", "repo", "type", "status", "priority", "title", "description", "createdAt", "updatedAt", "authorId", "releaseId", "points") SELECT "id", "repo", "type", "status", "priority", "title", "description", "createdAt", "updatedAt", "authorId", "releaseId", "points" FROM "temporary_issue"`);
        await queryRunner.query(`DROP TABLE "temporary_issue"`);
    }

}
