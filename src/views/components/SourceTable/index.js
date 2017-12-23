import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.scss';

const SourceTable = props => {
  const sourcesToRender = props.allSourcesQuery.allSources;
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Organization', accessor: 'org', minWidth: 200 },
    {
      Header: 'Phone',
      accessor: 'phone',
      Cell: props => <a href={`tel:+1-${props.value}`}>{props.value}</a>,
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: props => <a href={`mailto:${props.value}`}>{props.value}</a>,
    },
    { Header: 'Notes', accessor: 'notes', minWidth: 200 },
  ];

  return (
    <div>
      <ReactTable
        data={sourcesToRender}
        columns={columns}
        defaultPageSize={50}
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
