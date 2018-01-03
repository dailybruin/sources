import * as fs from 'fs';
import * as path from 'path';
import { makeExecutableSchema } from 'graphql-tools';

import {
  getAllSources,
  createSource,
  getSource,
  deleteSource,
  updateSource,
} from '../controllers/sourceController';

const typeDefs = [
  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
];

const resolvers = {
  Query: {
    source: (_, { id }) => getSource(id),
    sources: getAllSources,
  },

  Mutation: {
    addSource: (_, args) => createSource(args),
    updateSource: (_, { id, ...args }) => updateSource(id, args),
    removeSource: (_, { id }) => deleteSource(id),
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
