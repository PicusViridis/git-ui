import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitUser1654275363761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO `user` (`username`, `password`) VALUES ('admin', '58acb7acccce58ffa8b953b12b5a7702bd42dae441c1ad85057fa70b')"
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `user`')
  }
}
