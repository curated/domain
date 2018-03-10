import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm'
import { Actor } from './Actor'
import { Issue } from './Issue'

@Entity()
export class Repository {
  @PrimaryGeneratedColumn({})
  id: number

  @Index({})
  @Column({ type: 'varchar', unique: true, length: 50 })
  githubId: string

  @Column({ type: 'text', nullable: true })
  url: string

  @Column({ type: 'text', nullable: true })
  name: string

  @Column({ type: 'varchar', nullable: true, length: 50 })
  primaryLanguage: string

  @Column({ type: 'int', default: 0 })
  forks: number

  @Column({ type: 'int', default: 0 })
  stargazers: number

  @Index({})
  @ManyToOne(type => Actor, owner => owner.repositories, {
    nullable: true,
  })
  owner: Actor

  @OneToMany(type => Issue, issue => issue.author)
  issues: Issue[]
}
