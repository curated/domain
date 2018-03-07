import { getManager, EntityManager } from 'typeorm'
import { Actor } from './entity/Actor'
import { Issue } from './entity/Issue'
import { Repository } from './entity/Repository'
import { ActorSchema, IssueSchema, RepositorySchema } from 'curated-octograph'

export const mergeIssue = async (schema: IssueSchema): Promise<Issue> => {
  return getManager().transaction(async em => {
    const existing = await em.findOne(Issue, {
      githubId: schema.githubId,
    })
    const issue = existing || new Issue()
    const merged = await em.merge(Issue, issue, schema)
    if (schema.author) {
      merged.author = await mergeActor(schema.author)
    }
    if (schema.repository) {
      merged.repository = await mergeRep(schema.repository)
    }
    return em.save(merged)
  })
}

const mergeActor = async (schema: ActorSchema): Promise<Actor> => {
  const em = getManager()
  const existing = await em.findOne(Actor, {
    githubId: schema.githubId,
  })
  const merged = await em.merge(Actor, existing || new Actor(), schema)
  return em.save(merged)
}

const mergeRep = async (schema: RepositorySchema): Promise<Repository> => {
  const em = getManager()
  const existing = await em.findOne(Repository, {
    githubId: schema.githubId,
  })
  const rep = existing || new Repository()
  const merged = await em.merge(Repository, rep, schema)
  if (schema.owner) {
    merged.owner = await mergeActor(schema.owner)
  }
  return em.save(merged)
}
