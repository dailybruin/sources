import * as React from 'react';
import * as Modal from 'react-modal';
import { graphql, compose } from 'react-apollo';
import * as gql from 'graphql-tag';

import { addSource, updateSource, sourcesQuery } from '../graphql';
import './style.scss';

export enum ModalType {
  Add,
  Edit,
}

class SourceTableModal extends React.Component<any, any> {
  public state = {
    name: '',
    organization: '',
    phones: '',
    emails: '',
    notes: '',
    id: '',
  };
  public initializeInputs = () => {
    if (this.props.type === ModalType.Edit) {
      this.setState({ ...this.props.source });
    }
  };

  public createSource = async event => {
    event.preventDefault();
    const { name, organization, phones, emails, notes } = this.state;
    await this.props.addSource({
      variables: {
        name,
        organization,
        phones,
        emails,
        notes,
      },
      update: (store, { data: { addSource: sourceToAdd } }) => {
        const data = store.readQuery({ query: sourcesQuery });
        data.sources.unshift(sourceToAdd);
        store.writeQuery({ query: sourcesQuery, data });
      },
    });
    this.props.onRequestClose();
  };

  public updateSource = async event => {
    event.preventDefault();
    const {
      id: sourceToUpdateID,
      name,
      organization,
      phones,
      emails,
      notes,
    } = this.state;
    await this.props.updateSource({
      variables: {
        id: sourceToUpdateID,
        name,
        organization,
        phones,
        emails,
        notes,
      },
      update: store => {
        const data = store.readQuery({ query: sourcesQuery });
        const sourceToUpdate = data.sources.find(
          source => source.id === sourceToUpdateID
        );
        Object.assign(sourceToUpdate, {
          id: sourceToUpdateID,
          name,
          organization,
          phones,
          emails,
          notes,
        });
        store.writeQuery({ query: sourcesQuery, data });
      },
    });
    this.props.onRequestClose();
  };

  public onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  public render() {
    const label =
      this.props.type === ModalType.Add ? 'Add a Source' : 'Edit Source';

    const styles = {
      content: {
        top: '6rem',
        left: '4rem',
        right: '4rem',
        bottom: 'auto',
      },
    };

    return (
      <Modal
        style={styles}
        contentLabel={label}
        onAfterOpen={this.initializeInputs}
        {...this.props}
      >
        <h1 className="modal__header">{label}</h1>
        <form
          className="modal__form"
          onSubmit={
            this.props.type === ModalType.Add
              ? this.createSource
              : this.updateSource
          }
        >
          <div>
            <label htmlFor="name">Source Name: </label>
            <input
              id="name"
              onChange={this.onChange}
              value={this.state.name}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="organization">Source Organization: </label>
            <input
              id="organization"
              onChange={this.onChange}
              value={this.state.organization}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="phones">Source Phone: </label>
            <input
              id="phones"
              onChange={this.onChange}
              value={this.state.phones}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="emails">Source Email: </label>
            <input
              id="emails"
              type="text"
              onChange={this.onChange}
              value={this.state.emails}
            />
          </div>
          <div>
            <label htmlFor="notes">Notes: </label>
            <textarea
              id="notes"
              onChange={this.onChange}
              value={this.state.notes}
              rows={4}
            />
          </div>
          <input
            type="submit"
            value={this.props.type === ModalType.Add ? 'Create' : 'Update'}
          />
        </form>
      </Modal>
    );
  }
}

export default compose(
  graphql(addSource, { name: 'addSource' }),
  graphql(updateSource, { name: 'updateSource' })
)(SourceTableModal);
