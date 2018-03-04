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

  @Column({ type: 'varchar', length: 1000 })
  url: string

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', length: 100 })
  primaryLanguage: string

  @Column({ type: 'int' })
  forks: number

  @Column({ type: 'int' })
  stargazers: number

  @ManyToOne(type => Actor, owner => owner.repositories, {
    cascadeInsert: true,
    cascadeUpdate: true, // TODO: test
  })
  owner: Actor

  @OneToMany(type => Issue, issue => issue.author)
  issues: Issue[]
}
