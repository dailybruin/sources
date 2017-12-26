import React from 'react';
import matchSorter from 'match-sorter';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ContextMenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import Modal from 'react-modal';

import './style.scss';
import SourceTableContextMenu from './SourceTableContextMenu';
import SourceTableModal from './SourceTableModal';

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
      accessor: 'organization',
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
    this.state = { value: '', modalIsOpen: false };
  }

  handleChange = event => {
    const newValue = event.target.value;
    this.setState({ value: newValue });
    return this.refs.reactTable.filterColumn(this.columns[0], newValue);
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="source-table">
        <div>Test</div>
        <ContextMenuProvider id="menu_id" event="onClick">
          <div>Context Menu</div>
        </ContextMenuProvider>
        <div className="source-table__input">
          <div className="source-table__input__add" onClick={this.openModal}>
            Add a Source
          </div>
          <input
            type="text"
            name="filter"
            placeholder="Search"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
        <ReactTable
          ref="reactTable"
          data={this.props.sources}
          columns={this.columns}
          defaultPageSize={50}
          className="-striped -highlight"
        />
        <SourceTableContextMenu />
        <SourceTableModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add a Source"
        />
      </div>
    );
  }
}

export default SourceTable;
