const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

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

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });
