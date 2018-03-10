import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Actor } from './Actor'
import { Repository } from './Repository'

@Entity()
export class Issue {
  @PrimaryGeneratedColumn({})
  public id: number

  @Index({})
  @Column({ type: 'varchar', unique: true, length: 50 })
  public githubId: string

  @Column({ type: 'text', nullable: true })
  public url: string

  @Column({ type: 'int', nullable: true })
  public number: number

  @Column({ type: 'text', nullable: true })
  public title: string

  @Column({ type: 'text', nullable: true })
  public bodyText: string

  @Column({ type: 'varchar', nullable: true, length: 50 })
  public state: string

  @Column({ type: 'timestamp', nullable: true })
  public createdAt: Date

  @Column({ type: 'timestamp', nullable: true })
  public updatedAt: Date

  @Column({ type: 'int', default: 0 })
  public heart: number

  @Column({ type: 'int', default: 0 })
  public hooray: number

  @Column({ type: 'int', default: 0 })
  public thumbsUp: number

  @Column({ type: 'int', default: 0 })
  public laugh: number

  @Column({ type: 'int', default: 0 })
  public confused: number

  @Column({ type: 'int', default: 0 })
  public thumbsDown: number

  @Index({})
  @ManyToOne(type => Actor, author => author.issues, {
    nullable: true,
  })
  public author: Actor

  @Index({})
  @ManyToOne(type => Repository, repository => repository.issues, {
    nullable: true,
  })
  public repository: Repository
}
