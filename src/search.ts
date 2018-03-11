import { getManager, EntityManager } from 'typeorm'
import { Issue } from './entity/Issue'

const defaultResultSize = 10
const maxResultSize = 50

const forcedParams = {
  relations: ['author', 'repository', 'repository.owner'],
  cache: true,
}

export interface Params {
  where?: any
  order?: any
  skip?: number
  take?: number
}

export interface Result {
  issues: Issue[]
  count: number
}

export const findIssues = async (params: Params = {}): Promise<Result> => {
  const validatedParams = Object.assign({}, params)
  if (params.take > maxResultSize) {
    validatedParams.take = maxResultSize
  }
  if (!params.take || params.take < 0) {
    validatedParams.take = defaultResultSize
  }

  return new Promise<Result>(async (resolve, reject) => {
    try {
      const [issues, count] = await getManager().findAndCount(
        Issue,
        Object.assign(validatedParams, forcedParams),
      )
      resolve({ issues, count })
    } catch (e) {
      reject(e)
    }
  })
}
