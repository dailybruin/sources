import { Source } from '../models';

export async function createSource(data) {
  const newSource = await Source.create(data);
  return newSource;
}

export async function readAllSources() {
  const sources = await Source.all();
  return sources;
}

export async function updateSource(id: number, data: any) {
  const updatedSource = await Source.update(data, { where: { _id: id } });
  return updatedSource;
}

export async function deleteSource(id: number) {
  const deletedSource = await Source.destroy({ where: { _id: id } });
  return deletedSource;
}
