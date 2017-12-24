import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Header from '../Header';
import AddSourceButton from '../AddSourceButton';
import SourceTable from '../SourceTable';
import Filter from '../Filter';
import './style.scss';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

class MyComponent extends React.Component {
  data = [
    { name: 'Tanner Linsley', department: 1 },
    { name: 'Jason Maurer', department: 2 },
  ];
  columns = [
    { Header: 'Name', id: 'name', accessor: 'name' },
    { Header: 'Department', id: 'department', accessor: 'department' },
  ];

  constructor() {
    super();
    this.state = { value: '' };
  }

  onChange = e =>
    this.refs.reactTable.filterColumn(this.columns[1], e.target.value);

  onFilterChange = event => {
    console.log(event.target);
    this.setState({ value: event.target.value });
    return this.refs.reactTable.filterColumn(
      this.columns[0],
      event.target.value
    );
  };

  render() {
    return (
      <div>
        <select onChange={this.onChange}>
          <option value="">All</option>
          <option value="1">Department One</option>
          <option value="2">Department Two</option>
        </select>

        <input
          type="text"
          name="filter"
          placeholder="Search"
          value={this.state.value}
          onChange={this.onFilterChange}
        />

        <ReactTable ref="reactTable" columns={this.columns} data={this.data} />
      </div>
    );
  }
}

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
    <AddSourceButton />
    <SourceTable sources={props.allSourcesQuery.allSources} />
  </div>
);

export default graphql(ALL_SOURCES_QUERY, { name: 'allSourcesQuery' })(App);
