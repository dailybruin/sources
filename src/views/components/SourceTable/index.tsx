import * as React from 'react';
import * as matchSorter from 'match-sorter';
import { default as ReactTable, ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css';
import { ContextMenuTrigger } from 'react-contextmenu';

import './style.scss';
import SourceTableContextMenu from './SourceTableContextMenu';
import SourceTableModal from './SourceTableModal';

function filterMethod(filter, rows) {
  return matchSorter(rows, filter.value, {
    keys: ['name', 'org', 'phone', 'email'],
  });
}

console.log();
class SourceTable extends React.Component<any, any> {
  public state = { value: '', modalIsOpen: false };

  public columns = [
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

  public handleChange = event => {
    const newValue = event.target.value;
    this.setState({ value: newValue });
    return this.refs.reactTable.filterColumn(this.columns[0], newValue);
  };

  public openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  public closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  public render() {
    return (
      <div className="source-table">
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
          TbodyComponent={props => (
            <ContextMenuTrigger id="menu_id">
              <ReactTableDefaults.TbodyComponent {...props} />
            </ContextMenuTrigger>
          )}
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
