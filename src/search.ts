import { getManager, EntityManager } from 'typeorm'
import { OrderByCondition } from 'typeorm/find-options/OrderByCondition'
import { Issue } from './entity/Issue'

const defaultResultSize = 10
const maxResultSize = 50

const orderByAllowedColumns = new Set([
  'issue.createdAt',
  'issue.updatedAt',
  'issue.heart',
  'issue.hooray',
  'issue.thumbsUp',
  'issue.laugh',
  'issue.confused',
  'issue.thumbsDown',
])

export interface Params {
  where?: WhereParams
  orderBy?: OrderByCondition
  skip?: number
  take?: number
}

export interface WhereParams {
  state?: string
  authorId?: number
}

export interface Result {
  issues: Issue[]
  count: number
}

export const findIssues = async (params: Params = {}): Promise<Result> => {
  const queryParams = Object.assign({}, params)
  if (params.take > maxResultSize) {
    queryParams.take = maxResultSize
  }
  if (!params.take || params.take < 0) {
    queryParams.take = defaultResultSize
  }

  return new Promise<Result>(async (resolve, reject) => {
    try {
      const query = getManager().createQueryBuilder(Issue, 'issue')
      const where = queryParams.where || {}

      if (where.state) {
        query.where('issue.state = :state')
      }
      if (where.authorId) {
        query.where('author.id = :authorId')
      }

      if (queryParams.orderBy) {
        const valid = Object.keys(queryParams.orderBy).every(column =>
          orderByAllowedColumns.has(column),
        )
        if (valid) {
          query.orderBy(queryParams.orderBy)
        }
      }

      if (queryParams.skip) {
        query.skip(queryParams.skip)
      }

      const [issues, count] = await query
        .innerJoinAndSelect('issue.author', 'author')
        .innerJoinAndSelect('issue.repository', 'repository')
        .setParameters(where)
        .take(queryParams.take)
        .getManyAndCount()
      resolve({ issues, count })
    } catch (e) {
      reject(e)
    }
  })
}
