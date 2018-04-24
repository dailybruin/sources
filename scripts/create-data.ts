import * as faker from 'faker';
import { sequelize, Source } from '../src/models';

async function createSources(n) {
  for (let i = 0; i < n; i += 1) {
    await Source.create({
      name: faker.name.findName(),
      organization: faker.company.catchPhrase(),
      phones: faker.phone.phoneNumberFormat(),
      emails: faker.internet.email(),
      notes: faker.lorem.sentence(),
    });
  }
}

async function main() {
  await sequelize.sync({ force: true });
  await createSources(100);
  process.exit();
}

main();
