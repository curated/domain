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
  @Column({ type: 'varchar', length: 100 })
  githubId: string

  @Column({ nullable: true, type: 'varchar', length: 1000 })
  url: string

  @Column({ nullable: true, type: 'varchar', length: 100 })
  name: string

  @Column({ nullable: true, type: 'varchar', length: 100 })
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
