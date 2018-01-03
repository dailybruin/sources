import gql from 'graphql-tag';
export const sourcesQuery = gql`
  query SourcesQuery {
    sources {
      id
      name
      organization
      phones
      emails
      notes
    }
  }
`;

export const addSource = gql`
  mutation addSource(
    $name: String!
    $organization: String!
    $phones: String!
    $emails: String!
    $notes: String!
  ) {
    addSource(
      name: $name
      organization: $organization
      phones: $phones
      emails: $emails
      notes: $notes
    ) {
      id
      name
      organization
      phones
      emails
      notes
    }
  }
`;

export const updateSource = gql`
  mutation updateSource(
    $id: ID!
    $name: String
    $organization: String
    $phones: String
    $emails: String
    $notes: String
  ) {
    updateSource(
      id: $id
      name: $name
      organization: $organization
      phones: $phones
      emails: $emails
      notes: $notes
    ) {
      id
    }
  }
`;

export const removeSource = gql`
  mutation removeSource($id: ID!) {
    removeSource(id: $id)
  }
`;
