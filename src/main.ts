import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'

const isTestEnv = Object.is('test', process.env.NODE_ENV)
const database = isTestEnv ? 'curated_test' : 'curated'
const logging = !isTestEnv

const connectionPromise = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database,
  logging,
  synchronize: true,
  entities: [`${__dirname}/entity/**/*.js`],
  migrations: [`${__dirname}/migration/**/*.js`],
  subscribers: [`${__dirname}/subscriber/**/*.js`],
})

export const getConnection = (): Promise<Connection> => {
  return connectionPromise
}

export { Actor } from './entity/Actor'
export { Issue } from './entity/Issue'
export { Repository } from './entity/Repository'
export { mergeIssue } from './persistence'
