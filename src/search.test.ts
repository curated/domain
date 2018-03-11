import test from 'ava'
import { getManager } from 'typeorm'
import { getConnection } from './main'
import { findIssues } from './search'
import { Actor } from './entity/Actor'
import { Issue } from './entity/Issue'
import { Repository } from './entity/Repository'

test.before(async () => {
  await (await getConnection()).synchronize(true)
  const em = getManager()

  for (let i = 1; i <= 51; i++) {
    const createdAt = new Date('2015-12-31T15:05:33.000Z')
    createdAt.setDate(createdAt.getDate() + i)

    const issue: any = {
      githubId: `issue-${i}`,
      state: i % 2 > 0 ? 'OPEN' : 'CLOSED',
      thumbsUp: i * 10,
      createdAt,
    }

    issue.author = await em.save(Actor, {
      githubId: `author-${i}`,
    })

    issue.repository = await em.save(Repository, {
      githubId: `repository-${i}`,
    })

    await em.save(Issue, issue)
    em.createQueryBuilder()
  }
})

test('find issues with default result size', async t => {
  const result = await findIssues()
  t.is(result.count, 51)
  t.is(result.issues.length, 10)
})

test('find issues with max result size', async t => {
  const result = await findIssues({ take: 60 })
  t.is(result.count, 51)
  t.is(result.issues.length, 50)
})

test('find issues with skip', async t => {
  const result = await findIssues({ skip: 50 })
  t.is(result.count, 51)
  t.is(result.issues.length, 1)
  t.is(result.issues[0].githubId, 'issue-51')
})

test('find issues with included relations', async t => {
  const result = await findIssues({ where: { githubId: 'issue-1' } })
  t.is(result.issues[0].author.githubId, 'author-1')
  t.is(result.issues[0].repository.githubId, 'repository-1')
})

test('find issues with filter by state', async t => {
  const result = await findIssues({ where: { state: 'OPEN' }, take: 50 })
  t.is(result.count, 26)
  t.is(result.issues.length, 26)
  for (const issue of result.issues) {
    t.is(issue.state, 'OPEN')
  }
})

test('find issues with order by thumbsUp', async t => {
  const result = await findIssues({ order: { thumbsUp: 'DESC' } })
  const expected = [510, 500, 490, 480, 470, 460, 450, 440, 430, 420]
  t.is(result.count, 51)
  t.is(result.issues.length, 10)
  t.deepEqual(result.issues.map(issue => issue.thumbsUp), expected)
})

test('find issues with combined options', async t => {
  const result = await findIssues({
    where: { state: 'CLOSED' },
    order: { createdAt: 'ASC' },
    skip: 5,
    take: 3,
  })
  const a = [
    new Date('2016-01-12T15:05:33.000Z'),
    new Date('2016-01-14T15:05:33.000Z'),
    new Date('2016-01-16T15:05:33.000Z'),
  ]
  t.is(result.count, 25)
  t.is(result.issues.length, 3)
  t.deepEqual(result.issues.map(issue => issue.createdAt), a)
})
