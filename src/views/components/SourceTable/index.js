import React from 'react';
import matchSorter from 'match-sorter';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import './style.scss';

function filterMethod(filter, rows) {
  return matchSorter(rows, filter.value, {
    keys: ['name', 'org', 'phone', 'email'],
  });
}

class SourceTable extends React.Component {
  columns = [
    {
      Header: 'Name',
      id: 'name',
      accessor: 'name',
      filterMethod,
      filterAll: true,
    },
    {
      Header: 'Organization',
      accessor: 'org',
      minWidth: 200,
    },
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
    {
      Header: 'Notes',
      accessor: 'notes',
      minWidth: 200,
    },
  ];

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    return this.refs.reactTable.filterColumn(
      this.columns[0],
      event.target.value
    );
  };

  render() {
    return (
      <div className="source-table">
        <input
          type="text"
          name="filter"
          placeholder="Search"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <ReactTable
          ref="reactTable"
          data={this.props.sources}
          columns={this.columns}
          defaultPageSize={50}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default SourceTable;
