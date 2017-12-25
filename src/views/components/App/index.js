import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Header from '../Header';
import AddSourceButton from '../AddSourceButton';
import SourceTable from '../SourceTable';
import './style.scss';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

const ALL_SOURCES_QUERY = gql`
  query AllSourcesQuery {
    allSources {
      name
      org
      phone
      email
      notes
    }
  }
`;

const App = props => (
  <div className="container">
    <Header />
    <SourceTable sources={props.allSourcesQuery.allSources} />
    <div>Test hi</div>
  </div>
);

export default graphql(ALL_SOURCES_QUERY, { name: 'allSourcesQuery' })(App);
