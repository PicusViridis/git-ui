import {
  Column,
  CreateDateColumn,
  Entity,
  getConnection,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Release {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  repo: string

  @Column()
  name: string

  @Column()
  dueDate: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  static getRepository(): Repository<Release> {
    return getConnection().getRepository(Release)
  }
}
