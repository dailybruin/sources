import { getManager } from 'typeorm';
import { readAllSources, createSource } from '../controllers/sourceController';
export const resolvers = {
  Query: {
    allSources: readAllSources,
  },

  Mutation: {
    addSource: createSource,
  },
};

export default resolvers;
