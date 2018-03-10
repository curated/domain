import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm'
import { Actor } from './Actor'
import { Repository } from './Repository'

@Entity()
export class Issue {
  @PrimaryGeneratedColumn({})
  id: number

  @Index({})
  @Column({ type: 'varchar', length: 1000, unique: true })
  githubId: string

  @Column({ nullable: true, type: 'varchar', length: 1000 })
  url: string

  @Column({ nullable: true, type: 'int' })
  number: number

  @Column({ nullable: true, type: 'varchar', length: 1000 })
  title: string

  @Column({ nullable: true, type: 'text' })
  bodyText: string

  @Column({ nullable: true, type: 'varchar', length: 100 })
  state: string

  @Column({ nullable: true, type: 'timestamp' })
  createdAt: Date

  @Column({ nullable: true, type: 'timestamp' })
  updatedAt: Date

  @Column({ type: 'int', default: 0 })
  heart: number

  @Column({ type: 'int', default: 0 })
  hooray: number

  @Column({ type: 'int', default: 0 })
  thumbsUp: number

  @Column({ type: 'int', default: 0 })
  laugh: number

  @Column({ type: 'int', default: 0 })
  confused: number

  @Column({ type: 'int', default: 0 })
  thumbsDown: number

  @Index({})
  @ManyToOne(type => Actor, author => author.issues, {
    nullable: true,
  })
  author: Actor

  @Index({})
  @ManyToOne(type => Repository, repository => repository.issues, {
    nullable: true,
  })
  repository: Repository
}
