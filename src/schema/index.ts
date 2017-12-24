import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

// Define your types here.
const typeDefs = `
  type Source {
    id: ID!
    name: String!,
    org: String,
    phone: String,
    email: String,
    notes: String,
  }

  type Query {
    allSources: [Source!]!
  }

  type Mutation {
    addSource(
      name: String!,
      org: String,
      phone: String,
      email: String,
      notes: String): Source
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
