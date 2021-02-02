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

const types = ['bug', 'feature'] as const
export type Type = typeof types[number]

const statuses = ['to do', 'doing', 'done'] as const
export type Status = typeof statuses[number]

@Entity()
export class Issue {
  static getRepository(): Repository<Issue> {
    return getConnection().getRepository(Issue)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  repo: string

  @ManyToOne(() => User, { nullable: false, onDelete: 'RESTRICT' })
  author: User

  @ManyToOne(() => Release, { nullable: false, onDelete: 'RESTRICT' })
  release: Release

  @Column()
  type: Type

  @Column({ default: 'to do' })
  status: Status

  @Column({ default: 0 })
  priority: number

  @Column({ default: 0 })
  points: number

  @Column()
  title: string

  @Column('text')
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
