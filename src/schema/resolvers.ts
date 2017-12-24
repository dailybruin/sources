import { Source } from '../models/Source';
import { resolve } from 'url';

export const resolvers = {
  Query: {
    allSources: async () => {
      const sources = await Source.all();
      return sources;
    },
  },

  Mutation: {
    addSource: async (_, data) => {
      const source = await Source.create(data);
      return source;
    },
  },
};

export default resolvers;
