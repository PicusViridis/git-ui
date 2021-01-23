import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddStatus1611399139191 implements MigrationInterface {
  name = 'AddStatus1611399139191'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "issue" ADD COLUMN "status" varchar NOT NULL DEFAULT 'to do'`)
    await queryRunner.query(`ALTER TABLE "issue" ADD COLUMN "priority" integer NOT NULL DEFAULT 0`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "issue" DROP COLUMN "status"`)
    await queryRunner.query(`ALTER TABLE "issue" DROP COLUMN "priority"`)
  }
}
