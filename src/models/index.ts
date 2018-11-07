import * as connection from 'knex'
import * as pg from 'pg'

// console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'development')
// if (process.env.NODE_ENV === 'development') {
//   pg.defaults.ssl = true
// } else {
//   pg.defaults.ssl = false
// }

const knex = connection({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? 'sources-test' : 'sources',
  },
})

export const sourceTable = 'Sources'
export const userTable = 'Users'

export const sourceKeys = [
  'id',
  'name',
  'organization',
  'phones',
  'emails',
  'notes',
]

export interface SourceAttributes {
  name?: string
  organization?: string
  phones?: string
  emails?: string
  notes?: string
}

export interface SourceInstance extends SourceAttributes {
  id: number
}

export default knex
