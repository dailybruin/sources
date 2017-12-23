import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import matchSorter from 'match-sorter';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.scss';

function filterMethod(filter, rows) {
  return matchSorter(rows, filter.value, {
    keys: ['name', 'org', 'phone', 'email'],
  });
}

const SourceTable = props => {
  const sourcesToRender = props.allSourcesQuery.allSources;
  const columns = [
    { Header: 'Name', accessor: 'name', filterMethod, filterAll: true },
    {
      Header: 'Organization',
      accessor: 'org',
      minWidth: 200,
      filterMethod,
      filterAll: true,
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      Cell: props => <a href={`tel:+1-${props.value}`}>{props.value}</a>,
      filterMethod,
      filterAll: true,
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: props => <a href={`mailto:${props.value}`}>{props.value}</a>,
      filterMethod,
      filterAll: true,
    },
    { Header: 'Notes', accessor: 'notes', minWidth: 200, filterAll: true },
  ];

  return (
    <div>
      <ReactTable
        filterable
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
