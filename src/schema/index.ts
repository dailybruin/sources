import * as fs from 'fs';
import * as path from 'path';
import { makeExecutableSchema } from 'graphql-tools';

import { readAllSources, createSource } from '../controllers/sourceController';

const typeDefs = [
  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
];
// Define your types here.
// const typeDefs = `
//   type Source {
//     id: ID!
//     name: String!,
//     organization: String,
//     phone: String,
//     email: String,
//     notes: String,
//   }

//   type Query {
//     allSources: [Source!]!
//   }

//   type Mutation {
//     addSource(
//       name: String!,
//       organization: String,
//       phone: String,
//       email: String,
//       notes: String): Source
//   }
// `;

const resolvers = {
  Query: {
    allSources: readAllSources,
  },

  Mutation: {
    addSource: createSource,
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
