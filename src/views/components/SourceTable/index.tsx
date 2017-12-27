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
  public state = {
    filterValue: '',
    modalIsOpen: false,
    currentlySelectedRow: null,
  };

  public contextTrigger: any = null;
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

  public handleFilterChange = event => {
    const newFilterValue = event.target.value;
    this.setState({ filterValue: newFilterValue });
    return this.refs.reactTable.filterColumn(this.columns[0], newFilterValue);
  };

  public openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  public closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  public edit = () => {
    console.log(`Edit row ${this.state.currentlySelectedRow}!`);
  };

  public remove = () => {
    console.log(`Delete row ${this.state.currentlySelectedRow}!`);
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
            value={this.state.filterValue}
            onChange={this.handleFilterChange}
          />
        </div>
        <ReactTable
          ref="reactTable"
          data={this.props.sources}
          columns={this.columns}
          defaultPageSize={50}
          className="-striped -highlight"
          TbodyComponent={props => (
            <ContextMenuTrigger
              id="menu_id"
              ref={c => (this.contextTrigger = c)}
            >
              <ReactTableDefaults.TbodyComponent {...props} />
            </ContextMenuTrigger>
          )}
          getTrProps={(state, rowInfo, _, instance) => {
            return {
              onContextMenu: (e, handleOriginal) => {
                this.setState({ currentlySelectedRow: rowInfo.original.id });

                if (this.contextTrigger !== null) {
                  this.contextTrigger.handleContextClick(e);
                }

                // IMPORTANT! React-Table uses onClick internally to trigger
                // events like expanding SubComponents and pivots.
                // By default a custom 'onClick' handler will override this functionality.
                // If you want to fire the original onClick handler, call the
                // 'handleOriginal' function.
                if (handleOriginal) {
                  handleOriginal();
                }
              },
            };
          }}
        />
        <SourceTableContextMenu edit={this.edit} remove={this.remove} />
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
