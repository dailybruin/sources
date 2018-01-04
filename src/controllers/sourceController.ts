import { Source } from '../models';
import { SourceAttributes, SourceInstance } from '../models/Source';

/**
 * Creates a new source from the specified parameters given. Returns that source instance.
 *
 * @param {SourceAttributes} attributes An object of attributes for the source.
 */
export async function createSource(
  attributes: SourceAttributes
): Promise<SourceInstance> {
  const newSource: SourceInstance = await Source.create(attributes);
  return newSource;
}

/**
 * Returns a source instance by it's id. If no source with the specified id exists, return null.
 *
 * @param {number} id The id of the desired source.
 */
export async function getSource(id: number): Promise<SourceInstance | null> {
  const source: SourceInstance | null = await Source.findById(id);
  return source;
}

/**
 * Returns an array of all source instances in the database.
 */
export async function getAllSources(): Promise<SourceInstance[]> {
  const sources: SourceInstance[] = await Source.all();
  return sources;
}

/**
 * Updates a source with the given id to the attributes specified. Returns the instance of the updated source. If no source with the given id is found, return null.
 *
 * @param id
 * @param attributes
 */
export async function updateSource(
  id: number,
  attributes: SourceAttributes
): Promise<SourceInstance | null> {
  const [numberOfUpdatedSources, updatedSources] = await Source.update(
    attributes,
    {
      where: { id },
      returning: true,
    }
  );

  if (numberOfUpdatedSources === 1) {
    return updatedSources[0];
  } else if (numberOfUpdatedSources !== 0) {
    throw new Error(
      'More than 1 rows updated from single id in `updateSource`! This is bad!'
    );
  }
  return null;
}

/**
 * Deletes a source with the given id. Returns true if the source was deleted, returns false if there was an error.
 *
 * @param id
 */
export async function deleteSource(id: number): Promise<boolean> {
  const numberOfDeletedSources = await Source.destroy({
    where: { id },
  });

  if (numberOfDeletedSources === 1) {
    return true;
  } else if (numberOfDeletedSources !== 0) {
    throw new Error('More than 1 rows deleted from single id! This is bad!');
  }
  return false;
}
