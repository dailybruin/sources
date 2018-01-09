import * as React from 'react';
import * as Modal from 'react-modal';
import { graphql } from 'react-apollo';
import glamorous from 'glamorous';

import ModalHeader from './ModalHeader';
import { removeSource, sourcesQuery } from '../graphql';

const modalStyles = {
  content: { top: '6rem', left: '10rem', right: '10rem', bottom: 'auto' },
};

interface SourceTableDeleteConfirmationModalProps {
  isOpen: boolean;
  source: any;

  onRequestClose: any;
  removeSource: any;
}

/**
 * Makes a GraphQL request to remove a source based on `currentlySelectedSource`.
 */

const DeleteModalButton = glamorous.button(
  {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '1rem 1.2rem',
    margin: '0.8rem 0.2rem',
    border: 'none',
    borderRadius: '0.2rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: 'Futura-Medium',
  },
  ({ use = 'primary' }) => ({
    backgroundColor: use === 'primary' ? '#CC4B37' : '#CACACA',
    ':hover': {
      backgroundColor: use === 'primary' ? '#CC4B37' : '#CACACA',
    },
  })
);

/**
 * The popup modal for to confirm deleting a source.
 */
class SourceTableDeleteConfirmationModal extends React.Component<
  SourceTableDeleteConfirmationModalProps,
  {}
> {
  public render() {
    return (
      <Modal
        appElement={document.getElementById('root')}
        style={modalStyles}
        {...this.props}
      >
        <ModalHeader>Are You Sure?</ModalHeader>
        <DeleteModalButton onClick={this.removeSource}>
          Delete
        </DeleteModalButton>
        <DeleteModalButton onClick={this.props.onRequestClose} use="secondary">
          Cancel
        </DeleteModalButton>
      </Modal>
    );
  }

  private removeSource = async () => {
    const sourceToDeleteID = this.props.source.id;

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

    this.props.onRequestClose();
  };
}

export default graphql(removeSource, { name: 'removeSource' })(
  SourceTableDeleteConfirmationModal
);
