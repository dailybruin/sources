import { graphql } from 'graphql';
import * as faker from 'faker';

import { sequelize, Source } from '../models';
import schema from './schema';

const source = {
  name: faker.name.findName(),
  organization: faker.company.catchPhrase(),
  phones: faker.phone.phoneNumberFormat(),
  emails: faker.internet.email(),
  notes: faker.lorem.sentence(),
};

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Source.create(source);
  console.log(`created ${source.name}`);
});

describe('source query', () => {
  it('should return a source with the given id', async () => {
    const id = '1';
    const query = `
      {
        source(id: ${id}) {
          id
          name
          organization
          phones
          emails
          notes
        }
      }
    `;

    const { data } = await graphql(schema, query);
    expect(data.source).toMatchObject(source);
    expect(data.source.id).toEqual(id);
  });

  it('should return null if there is no source with the given id', async () => {
    const id = '5';
    const query = `
      {
        source(id: ${id}) {
          id
          name
          organization
          phones
          emails
          notes
        }
      }
    `;

    const { data } = await graphql(schema, query);
    expect(data.source).toBeNull();
  });
});
