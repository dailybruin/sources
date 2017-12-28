import * as React from 'react';
import * as Modal from 'react-modal';
import { graphql, compose } from 'react-apollo';
import * as gql from 'graphql-tag';

import { addSource, updateSource } from '../graphql';
import './style.scss';

export enum ModalType {
  Add,
  Edit,
}

class SourceTableModal extends React.Component<any, any> {
  public state = {
    name: '',
    organization: '',
    phone: '',
    email: '',
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
    const { name, organization, phone, email, notes } = this.state;
    await this.props.addSource({
      variables: {
        name,
        organization,
        phone,
        email,
        notes,
      },
    });
    this.props.onRequestClose();
  };

  public updateSource = async event => {
    event.preventDefault();
    const { id, name, organization, phone, email, notes } = this.state;
    await this.props.updateSource({
      variables: {
        id,
        name,
        organization,
        phone,
        email,
        notes,
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
            <label htmlFor="phone">Source Phone: </label>
            <input
              id="phone"
              onChange={this.onChange}
              value={this.state.phone}
              type="tel"
            />
          </div>
          <div>
            <label htmlFor="email">Source Email: </label>
            <input
              id="email"
              type="email"
              onChange={this.onChange}
              value={this.state.email}
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
