import * as faker from 'faker'

import knex from '../models'
import * as sourceController from './sourceController'

beforeEach(async () => {
  await knex.schema.dropTableIfExists('Sources')
  await knex.schema.createTable('Sources', table => {
    table.increments('id')
    table.string('name')
    table.string('organization')
    table.string('phones')
    table.string('emails')
    table.string('notes')
  })
})

function getRandomSource() {
  return {
    name: faker.name.findName(),
    organization: faker.company.catchPhrase(),
    phones: faker.phone.phoneNumberFormat(),
    emails: faker.internet.email(),
    notes: faker.lorem.sentence(),
  }
}

describe('createSource', () => {
  it('should add a source entry to the database', async () => {
    const source = getRandomSource()

    await sourceController.createSource(source)

    const sourceResultsArray = await knex
      .where('name', source.name)
      .from('Sources')
    const sourceResult = sourceResultsArray[0]

    expect(sourceResultsArray).toHaveLength(1)
    expect(sourceResult).toMatchObject(source)
    expect(sourceResult).toHaveProperty('id')
    // expect(sourceResult).toHaveProperty('createdAt')
    // expect(sourceResult).toHaveProperty('updatedAt')
  })
})

describe('getSource', () => {
  it('retrieves a source from the database', async () => {
    const source = getRandomSource()
    await knex.table('Sources').insert(source)

    const retrievedSourceInstance = await sourceController.getSource(1)

    expect(retrievedSourceInstance).toMatchObject(source)
    expect(retrievedSourceInstance).toHaveProperty('id')
    // expect(retrievedSourceAttributes).toHaveProperty('createdAt')
    // expect(retrievedSourceAttributes).toHaveProperty('updatedAt')
  })

  it('returns null if a source with the specified ID cannot be found', async () => {
    const retrievedSourceInstance = await sourceController.getSource(2)
    expect(retrievedSourceInstance).toBeNull()
  })
})

describe('getAllSources', () => {
  it('returns an empty array when the database is empty', async () => {
    expect(await sourceController.getAllSources()).toHaveLength(0)
  })

  it('returns an array of all sources', async () => {
    const source = getRandomSource()
    await knex.table('Sources').insert(source)

    const allSources = await sourceController.getAllSources()
    const retrievedSourceAttributes = allSources[0]

    expect(allSources).toHaveLength(1)
    expect(retrievedSourceAttributes).toMatchObject(source)
  })
})

describe('updateSource', () => {
  it('updates an existing source from the database', async () => {
    await knex.table('Sources').insert(getRandomSource())

    const newName = faker.name.findName()

    const updatedSourceInstance = await sourceController.updateSource(1, {
      name: newName,
    })

    expect(updatedSourceInstance).toHaveProperty('name', newName)
  })

  it('returns null if a source with the specified ID cannot be found', async () => {
    const updatedSourceInstance = await sourceController.updateSource(2, {
      name: faker.name.findName(),
    })

    expect(updatedSourceInstance).toBeNull()
  })
})

describe('deleteSource', () => {
  it('deletes a source from the database and returns true', async () => {
    await knex.table('Sources').insert(getRandomSource())

    expect(await knex.table('Sources').returning('id')).toHaveLength(1)
    expect(await sourceController.deleteSource(1)).toBe(true)
    expect(await knex.table('Sources').returning('id')).toHaveLength(0)
  })

  it('does not delete a source from the database and returns false when the id is invalid', async () => {
    await knex.table('Sources').insert(getRandomSource())

    expect(await knex.table('Sources').returning('id')).toHaveLength(1)
    expect(await sourceController.deleteSource(2)).toBe(false)
    expect(await knex.table('Sources').returning('id')).toHaveLength(1)
  })
})
