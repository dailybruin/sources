import * as faker from 'faker';
import * as connection from 'knex';

const knex = connection({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'nathan',
    password: '',
    database: 'sources',
  },
});

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
      .into('Sources');
  }
}

async function main() {
  await knex.schema.dropTableIfExists('Sources');
  await knex.schema.createTable('Sources', table => {
    table.increments('id');
    table.string('name');
    table.string('organization');
    table.string('phones');
    table.string('emails');
    table.string('notes');
  });
  await createSources(100);
  process.exit();
}

main();
