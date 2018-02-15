import { getManager } from 'typeorm'
import { Actor } from './entity/Actor'
import { Issue } from './entity/Issue'
import { Repository } from './entity/Repository'
import {
  Actor as ActorSchema,
  Issue as IssueSchema,
  ReactionGroups as ReactionGroupsSchema,
  Repository as RepositorySchema,
} from 'curated-octograph'

export const mergeIssue = async (issueSchema: IssueSchema): Promise<Issue> => {
  const em = getManager()
  const existing = await em.findOne(Issue, {
    githubId: issueSchema.githubId,
  })
  const issue = existing || new Issue()
  // issue.author = await mergeAuthor(issueSchema.author)
  const merged = await em.merge(Issue, issue, issueSchema)
  return em.save(merged)
}

// const mergeAuthor = async (actorSchema: ActorSchema): Promise<Actor> => {
//   const em = getManager()
//   const existing = await em.findOne(Actor, {
//     githubId: actorSchema.githubId,
//   })
//   const author = await em.merge(Actor, existing || new Actor(), actorSchema)
//   return em.save(author)
// }
