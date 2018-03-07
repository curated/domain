import test from 'ava'
import { getManager } from 'typeorm'
import { getConnection } from './main'
import { mergeIssue } from './persistence'
import { Actor } from './entity/Actor'
import { Issue } from './entity/Issue'
import { Repository } from './entity/Repository'
import { ActorSchema, IssueSchema, RepositorySchema } from 'curated-octograph'
import {
  newIssueSchema,
  updatedIssueSchemaV1,
  updatedIssueSchemaV2,
} from './persistence.test.fixture'

test.before(async () => {
  await getConnection()
})

test('create issue with id only', async t => {
  const em = getManager()
  const mergedIssue = await mergeIssue({ githubId: 'blank' })
  const reloadedIssue = await em.findOne(Issue, { githubId: 'blank' })
  t.deepEqual(mergedIssue, reloadedIssue)
  t.true(mergedIssue.id > 0)
  t.is(reloadedIssue.githubId, 'blank')
})

test('create issue with properties', async t => {
  const em = getManager()
  const mergedIssue = await mergeIssue(newIssueSchema)
  const reloadedIssue = await em.findOne(Issue, {
    githubId: newIssueSchema.githubId,
  })

  t.true(mergedIssue.id > 0)
  t.is(reloadedIssue.githubId, 'new-issue')
  t.is(reloadedIssue.url, 'https://github.com/organization/repository/issues/1')
  t.is(reloadedIssue.number, 1)
  t.is(reloadedIssue.title, 'new issue')
  t.is(reloadedIssue.bodyText, 'description')
  t.is(reloadedIssue.state, 'CLOSED')
  t.deepEqual(reloadedIssue.createdAt, new Date('2017-07-26T20:05:32.000Z'))
  t.deepEqual(reloadedIssue.updatedAt, new Date('2017-11-03T10:31:08.000Z'))
  t.is(reloadedIssue.heart, 6)
  t.is(reloadedIssue.hooray, 5)
  t.is(reloadedIssue.thumbsUp, 4)
  t.is(reloadedIssue.laugh, 3)
  t.is(reloadedIssue.confused, 2)
  t.is(reloadedIssue.thumbsDown, 1)
})

test('create nested author within issue', async t => {
  const em = getManager()
  const mergedIssue = await mergeIssue(newIssueSchema)
  const reloadedAuthor = await em.findOne(Actor, {
    githubId: newIssueSchema.author.githubId,
  })

  t.true(mergedIssue.author.id > 0)
  t.is(reloadedAuthor.githubId, 'User:42')
  t.is(reloadedAuthor.url, 'https://github.com/user')
  t.is(reloadedAuthor.login, 'user')
  t.is(
    reloadedAuthor.avatarUrl,
    'https://avatars0.githubusercontent.com/u/42?v=4',
  )
})

test('create nested repository within issue', async t => {
  const em = getManager()
  const mergedIssue = await mergeIssue(newIssueSchema)
  const reloadedRepository = await em.findOne(Repository, {
    githubId: newIssueSchema.repository.githubId,
  })

  t.true(mergedIssue.repository.id > 0)
  t.is(reloadedRepository.githubId, 'repository')
  t.is(reloadedRepository.url, 'https://github.com/organization/repository')
  t.is(reloadedRepository.name, 'repository')
  t.is(reloadedRepository.primaryLanguage, 'TypeScript')
  t.is(reloadedRepository.forks, 1)
  t.is(reloadedRepository.stargazers, 2)
})

test('create nested repository owner within issue', async t => {
  const em = getManager()
  const mergedIssue = await mergeIssue(newIssueSchema)
  const reloadedOwner = await em.findOne(Actor, {
    githubId: newIssueSchema.repository.owner.githubId,
  })

  t.true(mergedIssue.repository.owner.id > 0)
  t.is(reloadedOwner.githubId, 'Organization:43')
  t.is(reloadedOwner.url, 'https://github.com/organization')
  t.is(reloadedOwner.login, 'organization')
  t.is(
    reloadedOwner.avatarUrl,
    'https://avatars2.githubusercontent.com/u/43?v=4',
  )
})

test.serial('update issue by github id', async t => {
  const em = getManager()
  await mergeIssue(updatedIssueSchemaV1)
  const mergedIssue = await mergeIssue(updatedIssueSchemaV2)
  const reloadedIssue = await em.findOne(Issue, {
    githubId: updatedIssueSchemaV2.githubId,
  })

  t.true(mergedIssue.id > 0)
  t.is(reloadedIssue.githubId, 'MDU6SXNzdWUyNDU4Mzg1MDY=')
  t.is(reloadedIssue.url, 'https://github.com/curated/octograph/issues/1')
  t.is(reloadedIssue.number, 1)
  t.is(reloadedIssue.bodyText, 'bar')
  t.is(reloadedIssue.state, 'CLOSED')
  t.deepEqual(reloadedIssue.createdAt, new Date('2017-07-26T20:05:32.000Z'))
  t.is(reloadedIssue.heart, 62)
  t.is(reloadedIssue.hooray, 53)
  t.is(reloadedIssue.thumbsUp, 44)
  t.is(reloadedIssue.laugh, 35)
  t.is(reloadedIssue.confused, 26)
  t.is(reloadedIssue.thumbsDown, 17)

  t.is(reloadedIssue.title, 'new title')
  t.deepEqual(reloadedIssue.updatedAt, new Date('2017-12-03T10:31:08.000Z'))
})

test.serial('update nested author within issue', async t => {
  const em = getManager()
  await mergeIssue(updatedIssueSchemaV1)
  const mergedIssue = await mergeIssue(updatedIssueSchemaV2)
  const reloadedAuthor = await em.findOne(Actor, {
    githubId: updatedIssueSchemaV2.author.githubId,
  })

  t.true(mergedIssue.author.id > 0)
  t.is(reloadedAuthor.githubId, 'User:36428176')
  t.is(
    reloadedAuthor.avatarUrl,
    'https://avatars0.githubusercontent.com/u/36428176?v=4',
  )

  t.is(reloadedAuthor.url, 'https://github.com/renamed-inspectocat')
  t.is(reloadedAuthor.login, 'renamed-inspectocat')
})

test.serial('update nested repository within issue', async t => {
  const em = getManager()
  await mergeIssue(updatedIssueSchemaV1)
  const mergedIssue = await mergeIssue(updatedIssueSchemaV2)
  const reloadedRepository = await em.findOne(Repository, {
    githubId: updatedIssueSchemaV2.repository.githubId,
  })

  t.true(mergedIssue.repository.id > 0)
  t.is(reloadedRepository.githubId, 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==')
  t.is(reloadedRepository.primaryLanguage, 'TypeScript')
  t.is(reloadedRepository.forks, 123)
  t.is(reloadedRepository.stargazers, 456)

  t.is(reloadedRepository.url, 'https://github.com/curated/renamed-octograph')
  t.is(reloadedRepository.name, 'renamed-octograph')
})

test.serial('update nested repository owner within issue', async t => {
  const em = getManager()
  await mergeIssue(updatedIssueSchemaV1)
  const mergedIssue = await mergeIssue(updatedIssueSchemaV2)
  const reloadedOwner = await em.findOne(Actor, {
    githubId: updatedIssueSchemaV2.repository.owner.githubId,
  })

  t.true(mergedIssue.repository.owner.id > 0)
  t.is(reloadedOwner.githubId, 'Organization:36278390')
  t.is(
    reloadedOwner.avatarUrl,
    'https://avatars2.githubusercontent.com/u/36278390?v=4',
  )

  t.is(reloadedOwner.url, 'https://github.com/renamed-curated')
  t.is(reloadedOwner.login, 'renamed-curated')
})
