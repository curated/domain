import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm'
import { Issue } from './Issue'
import { Repository } from './Repository'

@Entity()
export class Actor {
  @PrimaryGeneratedColumn({})
  id: number

  @Index({})
  @Column({ type: 'varchar', length: 100 })
  githubId: string

  @Column({ type: 'varchar', length: 1000 })
  url: string

  @Column({ type: 'varchar', length: 100 })
  login: string

  @Column({ type: 'varchar', length: 1000 })
  avatarUrl: string

  @OneToMany(type => Repository, repository => repository.owner)
  repositories: Repository[]

  @OneToMany(type => Issue, issue => issue.author)
  issues: Issue[]
}
