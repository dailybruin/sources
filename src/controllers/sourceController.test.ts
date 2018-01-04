import * as faker from 'faker';

import { sequelize, Source } from '../models';
import * as sourceController from './sourceController';
import { SourceInstance } from '../models/Source';

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

function getRandomSource() {
  return {
    name: faker.name.findName(),
    organization: faker.company.catchPhrase(),
    phones: faker.phone.phoneNumberFormat(),
    emails: faker.internet.email(),
    notes: faker.lorem.sentence(),
  };
}

describe('createSource', () => {
  it('should add a source entry to the database', async () => {
    const source = getRandomSource();

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

describe('getSource', () => {
  it('retrieves a source from the database', async () => {
    const source = {
      name: faker.name.findName(),
      organization: faker.company.catchPhrase(),
      phones: faker.phone.phoneNumberFormat(),
      emails: faker.internet.email(),
      notes: faker.lorem.sentence(),
    };
    await Source.create(source);

    const retrievedSourceInstance = await sourceController.getSource(1);
    const retrievedSourceAttributes = retrievedSourceInstance.get({
      plain: true,
    });

    expect(retrievedSourceAttributes).toMatchObject(source);
    expect(retrievedSourceAttributes).toHaveProperty('id');
    expect(retrievedSourceAttributes).toHaveProperty('createdAt');
    expect(retrievedSourceAttributes).toHaveProperty('updatedAt');
  });

  it('returns null if a source with the specified ID cannot be found', async () => {
    const retrievedSourceInstance = await sourceController.getSource(2);
    expect(retrievedSourceInstance).toBeNull();
  });
});

describe('getAllSources', () => {
  it('returns an empty array when the database is empty', async () => {
    expect(await sourceController.getAllSources()).toHaveLength(0);
  });

  it('returns an array of all sources', async () => {
    const source = getRandomSource();
    await Source.create(source);

    const allSources = await sourceController.getAllSources();
    const retrievedSourceAttributes = allSources[0].get({ plain: true });

    expect(allSources).toHaveLength(1);
    expect(retrievedSourceAttributes).toMatchObject(source);
  });
});

describe('updateSource', () => {
  it('updates an existing source from the database', async () => {
    await Source.create(getRandomSource());

    const newName = faker.name.findName();

    const updatedSourceInstance = await sourceController.updateSource(1, {
      name: newName,
    });
    const updatedSourceAttributes = updatedSourceInstance.get({
      plain: true,
    });

    expect(updatedSourceAttributes).toHaveProperty('name', newName);
  });

  it('returns null if a source with the specified ID cannot be found', async () => {
    const updatedSourceInstance = await sourceController.updateSource(2, {
      name: faker.name.findName(),
    });

    expect(updatedSourceInstance).toBeNull();
  });
});

describe('deleteSource', () => {
  it('deletes a source from the database and returns true', async () => {
    await Source.create(getRandomSource());

    expect(await Source.findAll()).toHaveLength(1);
    expect(await sourceController.deleteSource(1)).toBe(true);
    expect(await Source.findAll()).toHaveLength(0);
  });

  it('does not delete a source from the database and returns false when the id is invalid', async () => {
    await Source.create(getRandomSource());

    expect(await Source.findAll()).toHaveLength(1);
    expect(await sourceController.deleteSource(2)).toBe(false);
    expect(await Source.findAll()).toHaveLength(1);
  });
});
