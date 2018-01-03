import * as fs from 'fs';
import * as path from 'path';
import { makeExecutableSchema } from 'graphql-tools';

import {
  readAllSources,
  createSource,
  readSource,
  deleteSource,
  updateSource,
} from '../controllers/sourceController';

const typeDefs = [
  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
];

const resolvers = {
  Query: {
    source: readSource,
    sources: readAllSources,
  },

  Mutation: {
    addSource: (_, args) => createSource(args),
    updateSource,
    removeSource: deleteSource,
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
