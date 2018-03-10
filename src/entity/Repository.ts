import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Actor } from './Actor'
import { Issue } from './Issue'

@Entity()
export class Repository {
  @PrimaryGeneratedColumn({})
  public id: number

  @Index({})
  @Column({ type: 'varchar', unique: true, length: 50 })
  public githubId: string

  @Column({ type: 'text', nullable: true })
  public url: string

  @Column({ type: 'text', nullable: true })
  public name: string

  @Column({ type: 'varchar', nullable: true, length: 50 })
  public primaryLanguage: string

  @Column({ type: 'int', default: 0 })
  public forks: number

  @Column({ type: 'int', default: 0 })
  public stargazers: number

  @Index({})
  @ManyToOne(type => Actor, owner => owner.repositories, {
    nullable: true,
  })
  public owner: Actor

  @OneToMany(type => Issue, issue => issue.author)
  public issues: Issue[]
}
