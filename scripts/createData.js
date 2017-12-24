const faker = require('faker');
const Sequelize = require('sequelize');
const { Source } = require('../src/models');

const sequelize = new Sequelize(
  'sources',
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
  }
);

function createSources(n) {
  const promises = [];
  for (let i = 0; i < n; i += 1) {
    promises.push(
      Source.create({
        name: faker.name.findName(),
        org: faker.company.catchPhrase(),
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
