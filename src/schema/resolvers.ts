import { getManager } from 'typeorm';
import { Source } from '../models/Source';

export const resolvers = {
  Query: {
    allSources: async () => {
      const sourceRepository = getManager().getRepository(Source);
      const sources = await sourceRepository.find();
      return sources;
    },
  },

  Mutation: {
    addSource: async (_, data) => {
      const sourceRepository = getManager().getRepository(Source);
      const newSource = await sourceRepository.create(data);
      await sourceRepository.save(newSource);
      return newSource;
    },
  },
};

export default resolvers;
