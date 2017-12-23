import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const SourceTable = props => {
  const sourcesToRender = props.allSourcesQuery.allSources;

  return (
    <div>
      <ReactTable
        data={sourcesToRender}
        columns={[
          { Header: 'Name', accessor: 'name' },
          { Header: 'Organization', accessor: 'org' },
          { Header: 'Phone', accessor: 'phone' },
          { Header: 'Email', accessor: 'email' },
          { Header: 'Notes', accessor: 'notes' },
        ]}
        defaultPageSize={100}
        className="-striped -highlight"
      />
    </div>
  );
};

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

// 3
export default graphql(ALL_SOURCES_QUERY, { name: 'allSourcesQuery' })(
  SourceTable
);
