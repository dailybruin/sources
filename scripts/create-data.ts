import * as faker from 'faker'
import knex from '../src/models'

async function createSources(n) {
  for (let i = 0; i < n; i += 1) {
    await knex
      .insert({
        name: faker.name.findName(),
        organization: faker.company.catchPhrase(),
        phones: faker.phone.phoneNumberFormat(),
        emails: faker.internet.email(),
        notes: faker.lorem.sentence(),
      })
      .into('Sources')
  }
}

async function main() {
  await knex.schema.dropTableIfExists('Sources')
  await knex.schema.createTable('Sources', table => {
    table.increments('id')
    table.string('name')
    table.string('organization')
    table.string('phones')
    table.string('emails')
    table.string('notes')
  })
  await createSources(100)
  await knex
    .table('Sources')
    .where('id', '=', 1)
    .update({ name: 'Nathan Smith' })
  process.exit()
}

main()
