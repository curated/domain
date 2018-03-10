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
  @Column({ type: 'varchar', unique: true, length: 50 })
  githubId: string

  @Column({ type: 'text', nullable: true })
  url: string

  @Column({ type: 'text', nullable: true })
  login: string

  @Column({ type: 'text', nullable: true })
  avatarUrl: string

  @OneToMany(type => Repository, repository => repository.owner)
  repositories: Repository[]

  @OneToMany(type => Issue, issue => issue.author)
  issues: Issue[]
}
