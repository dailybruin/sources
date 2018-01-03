import { Source } from '../models';
import { SourceAttributes, SourceInstance } from '../models/Source';

/**
 * Creates a new source from the specified parameters given.
 *
 * @param source An object of parameters for the source.
 * @param source
 */
export async function createSource(
  source: SourceAttributes
): Promise<SourceInstance> {
  const newSource: SourceInstance = await Source.create(source);
  return newSource;
}

export async function getSource(id: number): Promise<SourceInstance | null> {
  const source: SourceInstance | null = await Source.findById(id);
  return source;
}
export async function getAllSources() {
  const sources: SourceAttributes[] = await Source.all();
  return sources;
}

export async function updateSource(
  _,
  { id, ...data }: any
): Promise<SourceAttributes | null> {
  const [numberOfUpdatedSources, updatedSources] = await Source.update(data, {
    where: { id },
    returning: true,
  });

  if (numberOfUpdatedSources === 1) {
    return updatedSources[0];
  } else if (numberOfUpdatedSources !== 0) {
    console.error('More than 1 rows updated from single id! This is bad!');
  }
  return null;
}

export async function deleteSource(_, { id }): Promise<boolean> {
  const numberOfDeletedSources = await Source.destroy({
    where: { id },
  });

  if (numberOfDeletedSources === 1) {
    return true;
  } else if (numberOfDeletedSources !== 0) {
    console.error('More than 1 rows deleted from single id! This is bad!');
  }
  return false;
}
