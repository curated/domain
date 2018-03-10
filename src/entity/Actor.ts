import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Issue } from './Issue'
import { Repository } from './Repository'

@Entity()
export class Actor {
  @PrimaryGeneratedColumn({})
  public id: number

  @Index({})
  @Column({ type: 'varchar', unique: true, length: 50 })
  public githubId: string

  @Column({ type: 'text', nullable: true })
  public url: string

  @Column({ type: 'text', nullable: true })
  public login: string

  @Column({ type: 'text', nullable: true })
  public avatarUrl: string

  @OneToMany(type => Repository, repository => repository.owner)
  public repositories: Repository[]

  @OneToMany(type => Issue, issue => issue.author)
  public issues: Issue[]
}
