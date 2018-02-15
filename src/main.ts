import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'

const isTestEnv = Object.is('test', process.env.NODE_ENV)
const database = isTestEnv ? 'curated_test' : 'curated'
const synchronize = isTestEnv
const logging = !isTestEnv

const connectionPromise = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database,
  synchronize,
  logging,
  entities: ['dist/entity/**/*.js'],
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js'],
})

export const getConnection = (): Promise<Connection> => {
  return connectionPromise
}

export { mergeIssue } from './persistence'
