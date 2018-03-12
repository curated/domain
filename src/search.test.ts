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
    const updatedAt = new Date('2016-12-31T15:05:33.000Z')
    createdAt.setDate(createdAt.getDate() + i)
    updatedAt.setDate(updatedAt.getDate() + i)

    const issue: any = {
      githubId: `issue-${i}`,
      state: i % 2 > 0 ? 'OPEN' : 'CLOSED',
      heart: i * 10,
      hooray: i * 9,
      thumbsUp: i * 8,
      laugh: i * 7,
      confused: i * 6,
      thumbsDown: i * 5,
      createdAt,
      updatedAt,
    }

    issue.author = await em.save(Actor, {
      githubId: `author-${i}`,
    })

    issue.repository = await em.save(Repository, {
      githubId: `repository-${i}`,
    })

    await em.save(Issue, issue)
  }
})

test('default result size', async t => {
  const result = await findIssues()
  t.is(result.count, 51)
  t.is(result.issues.length, 10)
})

test('max result size', async t => {
  const result = await findIssues({ take: 60 })
  t.is(result.count, 51)
  t.is(result.issues.length, 50)
})

test('skip', async t => {
  const result = await findIssues({ skip: 50 })
  t.is(result.count, 51)
  t.is(result.issues.length, 1)
  t.is(result.issues[0].githubId, 'issue-51')
})

test('joined relations', async t => {
  const result = await findIssues({ take: 1 })
  t.is(result.count, 51)
  t.is(result.issues.length, 1)
  t.is(result.issues[0].author.githubId, 'author-1')
  t.is(result.issues[0].repository.githubId, 'repository-1')
})

test('filter by state', async t => {
  const result = await findIssues({ where: { state: 'OPEN' }, take: 30 })
  t.is(result.count, 26)
  t.is(result.issues.length, 26)
  for (const issue of result.issues) {
    t.is(issue.state, 'OPEN')
  }
})

test('filter by author id', async t => {
  const result = await findIssues({ where: { authorId: 1 } })
  t.is(result.count, 1)
  t.is(result.issues.length, 1)
  t.is(result.issues[0].githubId, 'issue-1')
})

test('order by issue.heart', async t => {
  const result = await findIssues({ orderBy: { 'issue.heart': 'DESC' } })
  const expected = [510, 500, 490, 480, 470, 460, 450, 440, 430, 420]
  t.is(result.count, 51)
  t.is(result.issues.length, 10)
  t.deepEqual(result.issues.map(issue => issue.heart), expected)
})

test('order by issue.hooray', async t => {
  const result = await findIssues({ orderBy: { 'issue.hooray': 'DESC' } })
  const expected = [459, 450, 441, 432, 423, 414, 405, 396, 387, 378]
  t.is(result.count, 51)
  t.is(result.issues.length, 10)
  t.deepEqual(result.issues.map(issue => issue.hooray), expected)
})

test('order by issue.thumbsUp', async t => {
  const result = await findIssues({ orderBy: { 'issue.thumbsUp': 'DESC' } })
  const expected = [408, 400, 392, 384, 376, 368, 360, 352, 344, 336]
  t.is(result.count, 51)
  t.is(result.issues.length, 10)
  t.deepEqual(result.issues.map(issue => issue.thumbsUp), expected)
})

test('order by issue.laugh', async t => {
  const result = await findIssues({ orderBy: { 'issue.laugh': 'DESC' } })
  const expected = [357, 350, 343, 336, 329, 322, 315, 308, 301, 294]
  t.is(result.count, 51)
  t.is(result.issues.length, 10)
  t.deepEqual(result.issues.map(issue => issue.laugh), expected)
})

test('order by issue.confused', async t => {
  const result = await findIssues({ orderBy: { 'issue.confused': 'DESC' } })
  const expected = [306, 300, 294, 288, 282, 276, 270, 264, 258, 252]
  t.is(result.count, 51)
  t.is(result.issues.length, 10)
  t.deepEqual(result.issues.map(issue => issue.confused), expected)
})

test('order by issue.thumbsDown', async t => {
  const result = await findIssues({ orderBy: { 'issue.thumbsDown': 'DESC' } })
  const expected = [255, 250, 245, 240, 235, 230, 225, 220, 215, 210]
  t.is(result.count, 51)
  t.is(result.issues.length, 10)
  t.deepEqual(result.issues.map(issue => issue.thumbsDown), expected)
})

test('order by issue.createdAt', async t => {
  const result = await findIssues({
    orderBy: { 'issue.createdAt': 'ASC' },
    take: 3,
  })
  t.is(result.count, 51)
  t.is(result.issues.length, 3)
  t.deepEqual(result.issues.map(issue => issue.createdAt), [
    new Date('2016-01-01T15:05:33.000Z'),
    new Date('2016-01-02T15:05:33.000Z'),
    new Date('2016-01-03T15:05:33.000Z'),
  ])
})

test('order by issue.updatedAt', async t => {
  const result = await findIssues({
    orderBy: { 'issue.updatedAt': 'ASC' },
    take: 3,
  })
  t.is(result.count, 51)
  t.is(result.issues.length, 3)
  t.deepEqual(result.issues.map(issue => issue.updatedAt), [
    new Date('2017-01-01T15:05:33.000Z'),
    new Date('2017-01-02T15:05:33.000Z'),
    new Date('2017-01-03T15:05:33.000Z'),
  ])
})

test('combined options', async t => {
  const result = await findIssues({
    where: { state: 'CLOSED' },
    orderBy: { 'issue.createdAt': 'ASC' },
    skip: 5,
    take: 3,
  })
  t.is(result.count, 25)
  t.is(result.issues.length, 3)
  t.deepEqual(result.issues.map(issue => issue.githubId), [
    'issue-12',
    'issue-14',
    'issue-16',
  ])
})
