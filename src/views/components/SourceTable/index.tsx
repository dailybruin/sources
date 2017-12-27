import * as React from 'react';
import * as matchSorter from 'match-sorter';
import { default as ReactTable, ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css';
import { ContextMenuTrigger } from 'react-contextmenu';
import { compose, graphql } from 'react-apollo';

import './style.scss';
import SourceTableContextMenu from './SourceTableContextMenu';
import SourceTableModal from './SourceTableModal';
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
    currentlySelectedRowID: null,
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
    const sourceID = this.state.currentlySelectedRowID;

    console.log(`Edit row ${sourceID}!`);
  };

  public remove = async () => {
    const id = this.state.currentlySelectedRowID;
    await this.props.removeSource({ variables: { id } });
    console.log(`Deleted row ${id}!`);
  };
  public render() {
    return (
      <div className="source-table">
        {this.renderInput()}
        {this.renderTable()}

        <SourceTableContextMenu edit={this.edit} remove={this.remove} />
        <SourceTableModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add a Source"
        />
      </div>
    );
  }

  private renderInput = () => {
    return (
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
    );
  };

  private renderTable = () => {
    return (
      <ReactTable
        ref="reactTable"
        data={this.props.sourcesQuery.sources}
        columns={this.columns}
        defaultPageSize={50}
        className="-striped -highlight"
        TbodyComponent={props => (
          <ContextMenuTrigger id="menu_id" ref={c => (this.contextTrigger = c)}>
            <ReactTableDefaults.TbodyComponent {...props} />
          </ContextMenuTrigger>
        )}
        getTrProps={(state, rowInfo, _, instance) => {
          return {
            onContextMenu: (e, handleOriginal) => {
              this.setState({
                currentlySelectedRowID: rowInfo.original.id,
              });

              if (this.contextTrigger !== null) {
                this.contextTrigger.handleContextClick(e);
              }
              if (handleOriginal) {
                handleOriginal();
              }
            },
          };
        }}
      />
    );
  };
}

export default compose(
  graphql(sourcesQuery, { name: 'sourcesQuery' }),
  graphql(removeSource, { name: 'removeSource' })
)(SourceTable);
