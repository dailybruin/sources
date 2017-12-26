import * as fs from 'fs';
import * as path from 'path';
import { makeExecutableSchema } from 'graphql-tools';

import { readAllSources, createSource } from '../controllers/sourceController';

const typeDefs = [
  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
];

const resolvers = {
  Query: {
    allSources: readAllSources,
  },

  Mutation: {
    addSource: createSource,
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
