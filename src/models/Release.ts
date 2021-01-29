import {
  Column,
  CreateDateColumn,
  Entity,
  getConnection,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm'
import { Issue } from './Issue'

@Entity()
export class Release {
  static get repository(): Repository<Release> {
    return getConnection().getRepository(Release)
  }

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

  @OneToMany(() => Issue, (issue) => issue.release)
  issues: Issue[]
}
