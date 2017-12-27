import * as React from 'react';
import { graphql } from 'react-apollo';
import * as gql from 'graphql-tag';

import Header from '../Header';
import SourceTable from '../SourceTable';
import './style.scss';

const SOURCES_QUERY = gql`
  query AllSourcesQuery {
    sources {
      name
      organization
      phone
      email
      notes
    }
  }
`;

const App = props => (
  <div className="container">
    <Header />
    <SourceTable sources={props.sourcesQuery.sources} />
  </div>
);

export default graphql(SOURCES_QUERY, { name: 'sourcesQuery' })(App);
