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
  @Column({ type: 'varchar', unique: true, length: 50 })
  githubId: string

  @Column({ type: 'text', nullable: true })
  url: string

  @Column({ type: 'int', nullable: true })
  number: number

  @Column({ type: 'text', nullable: true })
  title: string

  @Column({ type: 'text', nullable: true })
  bodyText: string

  @Column({ type: 'varchar', nullable: true, length: 50 })
  state: string

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date

  @Column({ type: 'timestamp', nullable: true })
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
