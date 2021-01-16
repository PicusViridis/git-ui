import {
  Column,
  CreateDateColumn,
  Entity,
  getConnection,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm'
import { Release } from './Release'
import { User } from './User'

const issueTypes = ['bug', 'feature'] as const
export type IssueType = typeof issueTypes[number]

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  author: User

  @Column()
  repo: string

  @ManyToOne(() => Release)
  release: Release

  @Column()
  type: IssueType

  @Column()
  title: string

  @Column('text')
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  static getRepository(): Repository<Issue> {
    return getConnection().getRepository(Issue)
  }
}
