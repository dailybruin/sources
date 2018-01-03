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
    source: getSource,
    sources: getAllSources,
  },

  Mutation: {
    addSource: (_, args) => createSource(args),
    updateSource,
    removeSource: deleteSource,
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
