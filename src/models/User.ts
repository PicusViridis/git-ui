import { Column, Entity, getConnection, PrimaryColumn, Repository } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn()
  username: string

  @Column()
  password: string

  static getRepository(): Repository<User> {
    return getConnection().getRepository(User)
  }
}
