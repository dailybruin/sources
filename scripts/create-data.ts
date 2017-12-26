import * as faker from 'faker';
import { sequelize, Source } from '../src/models';

function createSources(n) {
  const promises = [];
  for (let i = 0; i < n; i += 1) {
    promises.push(
      Source.create({
        name: faker.name.findName(),
        organization: faker.company.catchPhrase(),
        phone: faker.phone.phoneNumberFormat(),
        email: faker.internet.email(),
        notes: faker.lorem.sentence(),
      })
    );
  }
  return Promise.all(promises);
}

async function main() {
  await sequelize.sync({ force: true });
  await createSources(100);
  process.exit();
}

main();
