const { Source } = require('../models');

module.exports = {
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
