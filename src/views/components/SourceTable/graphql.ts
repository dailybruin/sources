import * as gql from 'graphql-tag';
export const sourcesQuery = gql`
  query SourcesQuery {
    sources {
      name
      organization
      phone
      email
      notes
    }
  }
`;

export const addSource = gql`
  mutation addSource(
    $name: String!
    $organization: String!
    $phone: String!
    $email: String!
    $notes: String!
  ) {
    addSource(
      name: $name
      organization: $organization
      phone: $phone
      email: $email
      notes: $notes
    ) {
      id
    }
  }
`;

export const updateSource = gql`
  mutation updateSource(
    $id: ID!
    $name: String
    $organization: String
    $phone: String
    $email: String
    $notes: String
  ) {
    updateSource(
      id: $id
      name: $name
      organization: $organization
      phone: $phone
      email: $email
      notes: $notes
    )
  }
`;

export const deleteSource = gql`
  mutation deleteSource($id: ID!) {
    deleteSource(id: $id)
  }
`;
