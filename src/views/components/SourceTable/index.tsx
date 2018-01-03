import * as React from 'react';
import * as matchSorter from 'match-sorter';
import { default as ReactTable, ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css';
import { ContextMenuTrigger } from 'react-contextmenu';
import { compose, graphql } from 'react-apollo';

import './style.scss';
import SourceTableContextMenu from './SourceTableContextMenu';
import {
  default as SourceTableModal,
  ModalType,
  Source,
} from './SourceTableModal';
import { sourcesQuery, removeSource } from './graphql';

function filterMethod(filter, rows) {
  return matchSorter(rows, filter.value, {
    keys: ['name', 'org', 'phones', 'emails'],
  });
}

interface SourceTableProps {
  sourcesQuery: any;
  removeSource: any;
}

interface SourceTableState {
  filterValue: string;
  modalIsOpen: boolean;
  modalType: ModalType;
  currentlySelectedSource: Source | null;
}

class SourceTable extends React.Component<SourceTableProps, SourceTableState> {
  public state = {
    filterValue: '',
    modalIsOpen: false,
    modalType: ModalType.Add,
    currentlySelectedSource: null,
  };

  private contextTrigger: any = null;
  private table: any;

  private columns = [
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
      Header: 'Phones',
      accessor: 'phones',
      // Cell: props => <a href={`tel:+1-${props.value}`}>{props.value}</a>,
    },
    {
      Header: 'Emails',
      accessor: 'emails',
      // Cell: props => <a href={`mailto:${props.value}`}>{props.value}</a>,
    },
    {
      Header: 'Notes',
      accessor: 'notes',
      minWidth: 200,
    },
  ];

  public render() {
    const sources = this.props.sourcesQuery.sources;

    return (
      <div className="source-table">
        {/* Filter */}
        <div className="source-table__input">
          <div
            className="source-table__input__add"
            onClick={() => this.openModal(ModalType.Add)}
          >
            Add a Source
          </div>
          <input
            type="text"
            name="filter"
            placeholder="Search"
            value={this.state.filterValue}
            onChange={this.onFilterChange}
          />
          <div className="source-table__input__note">
            Edit or remove a source by right clicking on its row.
          </div>
        </div>
        {/* Table */}
        <ReactTable
          ref={instance => (this.table = instance)}
          data={sources}
          columns={this.columns}
          defaultPageSize={50}
          className="-striped -highlight"
          TbodyComponent={this.tableBody}
          getTrProps={this.handleTableContextClick}
        />
        {/* Popups */}
        <SourceTableContextMenu
          onEdit={() => this.openModal(ModalType.Edit)}
          onRemove={this.removeSource}
        />
        <SourceTableModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          type={this.state.modalType}
          source={this.state.currentlySelectedSource}
        />
      </div>
    );
  }

  /**
   * Changes the internal state of the filter's value on a change and filters the table based on this new value.
   */
  private onFilterChange = event => {
    const newFilterValue = event.target.value;
    this.setState({ filterValue: newFilterValue });
    return this.table.filterColumn(this.columns[0], newFilterValue);
  };

  /**
   * Makes a GraphQL request to remove a source based on `currentlySelectedSource`.
   */
  private removeSource = async () => {
    const sourceToDeleteID = this.state.currentlySelectedSource.id;

    await this.props.removeSource({
      // Pass id in GraphQL query
      variables: { id: sourceToDeleteID },
      // Update local cache so we don't have to refresh.
      update: store => {
        // Get the current sourcesQuery from the cache.
        const data = store.readQuery({ query: sourcesQuery });

        // Remove the deleted id.
        data.sources = data.sources.filter(
          source => source.id !== sourceToDeleteID
        );

        // Write the updated query back to the cache.
        store.writeQuery({ query: sourcesQuery, data });
      },
    });
  };

  /**
   * Function called to open modal.
   */
  private openModal = (type: ModalType) => {
    this.setState({ modalIsOpen: true, modalType: type });
  };

  /**
   * Function called when modal is closed.
   */
  private closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  /**
   * Custom tableBody for using react-table with react-contextmenu. Wraps the default body in a ContextMenuTrigger. Should be passed as the `TbodyComponent` prop to `ReactTable`.
   *
   * See https://github.com/vkbansal/react-contextmenu/blob/master/docs/faq.md and `handleTableContextClick` for more details on how the context menu is triggered.
   */
  private tableBody = props => (
    <ContextMenuTrigger
      id="SourceTable-ContextMenu"
      ref={c => (this.contextTrigger = c)}
    >
      <ReactTableDefaults.TbodyComponent {...props} />
    </ContextMenuTrigger>
  );

  /**
   * Function to add the context-menu popup behavior to react-table. Uses a callback prop on a table row to get the currently selected source and display a context trigger that will open the appropriate modal.
   *
   * See https://github.com/react-tools/react-table#custom-props for more documentation on how this works.
   */
  private handleTableContextClick = (_, rowInfo) => {
    return {
      onContextMenu: (event, handleOriginal) => {
        // Extract the Source data from the selected row and update `currentlySelectedSource`.
        this.setState({
          currentlySelectedSource: rowInfo.original,
        });

        // Manually opens the context menu.
        // See https://github.com/vkbansal/react-contextmenu/blob/master/docs/faq.md for details on this.
        if (this.contextTrigger !== null) {
          this.contextTrigger.handleContextClick(event);
        }

        // react-table uses event handlers for some default behaviors. Ensure these default behaviors happen with `handleOriginal`.
        if (handleOriginal) {
          handleOriginal();
        }
      },
    };
  };
}

export default compose(
  graphql(sourcesQuery, { name: 'sourcesQuery' }),
  graphql(removeSource, { name: 'removeSource' })
)(SourceTable);
