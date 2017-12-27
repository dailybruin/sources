import { Source } from '../models';
import { SourceAttributes } from '../models/Source';

/**
 *
 *
 * @export
 * @param {any} _
 * @param {any} data
 * @returns
 */
export async function createSource(_, data): Promise<SourceAttributes> {
  const newSource: SourceAttributes = await Source.create(data);
  return newSource;
}

export async function readSource(_, { id }): Promise<SourceAttributes | null> {
  const source: SourceAttributes | null = await Source.findById(id);
  return source;
}
export async function readAllSources() {
  const sources: SourceAttributes[] = await Source.all();
  return sources;
}

export async function updateSource(
  _,
  { id, ...data }: any
): Promise<SourceAttributes | null> {
  const [numberOfUpdatedSources, updatedSources] = await Source.update(data, {
    where: { id },
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
    where: { _id: id },
  });

  if (numberOfDeletedSources === 1) {
    return true;
  } else if (numberOfDeletedSources !== 0) {
    console.error('More than 1 rows deleted from single id! This is bad!');
  }
  return false;
}
