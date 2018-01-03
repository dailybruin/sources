import * as faker from 'faker';

import { sequelize, Source } from '../models';
import * as sourceController from './sourceController';
import { SourceInstance } from '../models/Source';

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

describe('createSource', () => {
  it('should add a source entry to the database', async () => {
    const source = {
      name: faker.name.findName(),
      organization: faker.company.catchPhrase(),
      phones: faker.phone.phoneNumberFormat(),
      emails: faker.internet.email(),
      notes: faker.lorem.sentence(),
    };

    await sourceController.createSource(source);

    const sourceResultsArray = await Source.findAll({
      where: {
        name: source.name,
      },
    });
    // We need the `plain: true` option so that we only get the object values we care about.
    // See http://docs.sequelizejs.com/manual/tutorial/instances.html#values-of-an-instance
    const sourceResult = sourceResultsArray[0].get({
      plain: true,
    });

    expect(sourceResultsArray).toHaveLength(1);
    expect(sourceResult).toMatchObject(source);
    expect(sourceResult).toHaveProperty('id');
    expect(sourceResult).toHaveProperty('createdAt');
    expect(sourceResult).toHaveProperty('updatedAt');
  });
});
