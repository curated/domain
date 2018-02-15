import test from 'ava'
import { getConnection } from './main'

test('database connection', async t => {
  const connection = await getConnection()
  t.is('curated_test', connection.options.database)
  t.true(connection.isConnected)
})
