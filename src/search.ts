import { getManager, EntityManager } from 'typeorm'
import { Issue } from './entity/Issue'

const defaultResultSize = 10
const maxResultSize = 50

const forceParams = {
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
  if (params.take > maxResultSize) {
    params.take = maxResultSize
  }

  if (!params.take || params.take < 0) {
    params.take = defaultResultSize
  }

  return getManager().transaction(async em => {
    const [issues, count] = await em.findAndCount(
      Issue,
      Object.assign(params, forceParams),
    )

    return { issues, count }
  })
}
