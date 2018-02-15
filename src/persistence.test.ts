import test from 'ava'
import { getManager } from 'typeorm'
import { getConnection } from './main'
import { mergeIssue } from './persistence'
import { Actor } from './entity/Actor'
import { Issue } from './entity/Issue'
import { Repository } from './entity/Repository'
import {
  Actor as ActorSchema,
  Issue as IssueSchema,
  ReactionGroups as ReactionGroupsSchema,
  Repository as RepositorySchema,
} from 'curated-octograph'
import { issueSchema } from './persistence.test.fixture'

test.before(async () => {
  await getConnection()
})

test('create an issue with only an id', async t => {
  const em = getManager()
  const mergedIssue = await mergeIssue({ githubId: 'blank' })
  const reloadedIssue = await em.findOne(Issue, { githubId: 'blank' })
  t.deepEqual(mergedIssue, reloadedIssue)
  t.true(mergedIssue.id > 0)
  t.is(reloadedIssue.githubId, 'blank')
})

test('create an issue with all properties', async t => {
  const em = getManager()
  const mergedIssue = await mergeIssue(issueSchema)
  const reloadedIssue = await em.findOne(Issue, {
    githubId: issueSchema.githubId,
  })

  t.true(mergedIssue.id > 0)
  t.is(reloadedIssue.githubId, 'MDU6SXNzdWUyNDU4Mzg1MDY=')
  t.is(reloadedIssue.url, 'https://github.com/curated/octograph/issues/1')
  t.is(reloadedIssue.number, 1)
  t.is(reloadedIssue.title, 'foo')
  t.is(reloadedIssue.bodyText, 'bar')
  t.is(reloadedIssue.state, 'CLOSED')
  t.deepEqual(reloadedIssue.createdAt, new Date('2017-07-26T20:05:32.000Z'))
  t.deepEqual(reloadedIssue.updatedAt, new Date('2017-11-03T10:31:08.000Z'))
  t.is(reloadedIssue.heart, 62)
  t.is(reloadedIssue.hooray, 53)
  t.is(reloadedIssue.thumbsUp, 44)
  t.is(reloadedIssue.laugh, 35)
  t.is(reloadedIssue.confused, 26)
  t.is(reloadedIssue.thumbsDown, 17)
})

test('create nested author within issue', async t => {
  const em = getManager()
  const mergedIssue = await mergeIssue(issueSchema)
  const reloadedAuthor = await em.findOne(Actor, {
    githubId: issueSchema.author.githubId,
  })

  t.true(mergedIssue.author.id > 0)
  t.is(reloadedAuthor.githubId, 'TODO')
  t.is(reloadedAuthor.url, 'https://github.com/inspectocat')
  t.is(reloadedAuthor.login, 'inspectocat')
  t.is(
    reloadedAuthor.avatarUrl,
    'https://avatars0.githubusercontent.com/u/36428176?v=4',
  )
})

test('create nested repository within issue', async t => {
  const em = getManager()
  const mergedIssue = await mergeIssue(issueSchema)
  const reloadedRepository = await em.findOne(Repository, {
    githubId: issueSchema.repository.githubId,
  })

  t.true(mergedIssue.repository.id > 0)
  t.is(reloadedRepository.githubId, 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==')
  t.is(reloadedRepository.url, 'https://github.com/curated/octograph')
  t.is(reloadedRepository.name, 'octograph')
  t.is(reloadedRepository.primaryLanguage, 'TypeScript')
  t.is(reloadedRepository.forks, 123)
  t.is(reloadedRepository.stargazers, 456)
})

test('create nested repository owner within issue', async t => {
  const em = getManager()
  const mergedIssue = await mergeIssue(issueSchema)
  const reloadedOwner = await em.findOne(Actor, {
    githubId: issueSchema.repository.owner.githubId,
  })

  t.true(mergedIssue.repository.owner.id > 0)
  t.is(reloadedOwner.githubId, 'MDEyOk9yZ2FuaXphdGlvbjY5NjMx')
  t.is(reloadedOwner.url, 'https://github.com/curated')
  t.is(reloadedOwner.login, 'curated')
  t.is(
    reloadedOwner.avatarUrl,
    'https://avatars2.githubusercontent.com/u/36278390?v=4',
  )
})
