import * as React from 'react';
import * as matchSorter from 'match-sorter';
import { default as ReactTable, ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css';
import { ContextMenuTrigger } from 'react-contextmenu';
import { compose, graphql } from 'react-apollo';

import './style.scss';
import SourceTableContextMenu from './SourceTableContextMenu';
import { default as SourceTableModal, ModalType } from './SourceTableModal';
import { sourcesQuery, removeSource } from './graphql';

function filterMethod(filter, rows) {
  return matchSorter(rows, filter.value, {
    keys: ['name', 'org', 'phone', 'email'],
  });
}

class SourceTable extends React.Component<any, any> {
  public state = {
    filterValue: '',
    modalIsOpen: false,
    modalType: ModalType.Add,
    currentlySelectedSource: {},
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

  /**
   * Changes the internal state of the filter's value on a change and filters the table based on this new value.
   *
   * @memberof SourceTable
   */
  public handleFilterChange = event => {
    const newFilterValue = event.target.value;
    this.setState({ filterValue: newFilterValue });
    return this.refs.reactTable.filterColumn(this.columns[0], newFilterValue);
  };

  public openModal = (type: ModalType) => {
    this.setState({ modalIsOpen: true, modalType: type });
  };

  public closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  public addSource = () => {
    this.openModal(ModalType.Add);
  };

  public editSource = async () => {
    this.openModal(ModalType.Edit);
  };

  public removeSource = async () => {
    const id = this.state.currentlySelectedSource.id;
    await this.props.removeSource({ variables: { id } });
    console.log(`Deleted row ${id}!`);
  };

  public tableOnContextClick = (event, handleOriginal, sourceInfo) => {
    // rowInfo.original.id
    this.setState({ currentlySelectedSource: sourceInfo });

    if (this.contextTrigger !== null) {
      this.contextTrigger.handleContextClick(event);
    }
    if (handleOriginal) {
      handleOriginal();
    }
  };

  public tableBody = props => (
    <ContextMenuTrigger id="menu_id" ref={c => (this.contextTrigger = c)}>
      <ReactTableDefaults.TbodyComponent {...props} />
    </ContextMenuTrigger>
  );

  public render() {
    return (
      <div className="source-table">
        {/* Filter */}
        <div className="source-table__input">
          <div className="source-table__input__add" onClick={this.addSource}>
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
        {/* Table */}
        <ReactTable
          ref="reactTable"
          data={this.props.sourcesQuery.sources}
          columns={this.columns}
          defaultPageSize={50}
          className="-striped -highlight"
          TbodyComponent={this.tableBody}
          getTrProps={(state, rowInfo, _, instance) => {
            return {
              onContextMenu: (e, handleOriginal) => {
                this.tableOnContextClick(e, handleOriginal, rowInfo.original);
              },
            };
          }}
        />
        {/* Popups */}
        <SourceTableContextMenu
          onEdit={this.editSource}
          onRemove={this.removeSource}
        />
        <SourceTableModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add a Source"
          type={this.state.modalType}
          source={this.state.currentlySelectedSource}
        />
      </div>
    );
  }
}

export default compose(
  graphql(sourcesQuery, { name: 'sourcesQuery' }),
  graphql(removeSource, { name: 'removeSource' })
)(SourceTable);
