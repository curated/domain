import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'

const connectionPromise = createConnection({
  type: 'postgres',
  port: 5432,
  host: process.env.PG_HOST,
  username: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  logging: !Object.is('test', process.env.NODE_ENV),
  synchronize: !Object.is('production', process.env.NODE_ENV),
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
