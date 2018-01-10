import * as React from 'react';
import * as Modal from 'react-modal';
import { graphql, compose } from 'react-apollo';
import glamorous from 'glamorous';

import { addSource, updateSource, sourcesQuery } from '../graphql';
import ModalHeader from './ModalHeader';

export enum ModalType {
  Add,
  Edit,
}

export interface Source {
  id: string;
  name: string;
  organization: string;
  phones: string;
  emails: string;
  notes: string;
}

const inputStyles: any = {
  width: '100%',
  padding: '0.4rem',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: '0.2rem',
  boxSizing: 'border-box',
};

const ModalInput = glamorous.div({
  margin: '0.2rem 0 0.6rem',
});

const ModalInputField = glamorous.input(inputStyles);
const ModalTextArea = glamorous.textarea(inputStyles);

const ModalInputNote = glamorous.div({
  color: '#8a8a8a',
  fontSize: '0.8rem',
});

const ModalSubmit = glamorous.input({
  width: '100%',
  backgroundColor: '#4caf50',
  color: 'white',
  padding: '1rem 1.2rem',
  margin: '0.8rem 0',
  border: 'none',
  borderRadius: '0.2rem',
  cursor: 'pointer',
  fontSize: '1rem',
  fontFamily: 'Futura-Medium',
  ':hover': {
    backgroundColor: '#45a049',
  },
});

interface SourceTableCreateUpdateModalProps {
  /** Whether or not the modal is open. */
  isOpen: boolean;
  /** Function for the modal to call on close. */
  onRequestClose: () => void;
  /** Label for Modal. */
  contentLabel: string;
  /** Type of modal. Can either be Add or Edit. */
  type: ModalType;
  source: Source;

  addSource: any;
  updateSource: any;
}

interface SourceTableCreateUpdateModalState {
  nameInputValue: string;
  organizationInputValue: string;
  phonesInputValue: string;
  emailsInputValue: string;
  notesInputValue: string;
  selectedSourceID: number;
}

/**
 * The popup modal for editing and adding sources to a SourceTable. It comes in 2 variants, Add and Edit which is specified by the type prop.
 */
class SourceTableCreateUpdateModal extends React.Component<
  SourceTableCreateUpdateModalProps,
  SourceTableCreateUpdateModalState
> {
  public state = {
    nameInputValue: '',
    organizationInputValue: '',
    phonesInputValue: '',
    emailsInputValue: '',
    notesInputValue: '',
    selectedSourceID: -1,
  };

  public createSource = async event => {
    event.preventDefault();
    const {
      nameInputValue: name,
      organizationInputValue: organization,
      phonesInputValue: phones,
      emailsInputValue: emails,
      notesInputValue: notes,
    } = this.state;

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

  public render() {
    const isAdd = this.props.type === ModalType.Add;
    const label = isAdd ? 'Add a Source' : 'Edit Source';

    return (
      <Modal
        appElement={document.getElementById('root')}
        style={this.modalStyles}
        contentLabel={label}
        onAfterOpen={this.initializeInputs}
        {...this.props}
      >
        <ModalHeader>{label}</ModalHeader>
        <form
          className="modal__form"
          onSubmit={isAdd ? this.createSource : this.updateSource}
        >
          <ModalInput>
            <label htmlFor="name">Source Name: </label>
            <ModalInputField
              id="name"
              onChange={this.onChange}
              value={this.state.nameInputValue}
              type="text"
            />
          </ModalInput>
          <ModalInput>
            <label htmlFor="organization">Source Organization: </label>
            <ModalInputField
              id="organization"
              onChange={this.onChange}
              value={this.state.organizationInputValue}
              type="text"
            />
          </ModalInput>
          <ModalInput>
            <label htmlFor="phones">Source Phone: </label>
            <ModalInputField
              id="phones"
              onChange={this.onChange}
              value={this.state.phonesInputValue}
              type="text"
            />
            <ModalInputNote>
              Work: (xxx) xxx-xxxx; Cell: (xxx) xxx-xxxx; etc.
            </ModalInputNote>
          </ModalInput>
          <ModalInput>
            <label htmlFor="emails">Source Email: </label>
            <ModalInputField
              id="emails"
              type="text"
              onChange={this.onChange}
              value={this.state.emailsInputValue}
            />
            <ModalInputNote>
              Work: suzy@dailybruin.com; Home: suzy@gmail.com; etc.
            </ModalInputNote>
          </ModalInput>
          <ModalInput>
            <label htmlFor="notes">Notes: </label>
            <ModalTextArea
              id="notes"
              onChange={this.onChange}
              value={this.state.notesInputValue}
              rows={4}
            />
          </ModalInput>
          <ModalSubmit type="submit" value={isAdd ? 'Create' : 'Update'} />
        </form>
      </Modal>
    );
  }

  /**
   * How react-modal likes its styles. See https://github.com/reactjs/react-modal#styles for details.
   */
  private modalStyles = {
    content: {
      top: '6rem',
      left: '4rem',
      right: '4rem',
      bottom: 'auto',
    },
  };

  /**
   * Initialize the input values of the modal's fields.
   *
   * If the modal is an add modal, all fields should be blank. If it's an edit modal, the fields should be the current values of the select source's attributes.
   */
  private initializeInputs = () => {
    const { source } = this.props;
    if (this.props.type === ModalType.Edit) {
      this.setState({
        nameInputValue: source.name,
        organizationInputValue: source.organization,
        phonesInputValue: source.phones,
        emailsInputValue: source.emails,
        notesInputValue: source.notes,
        selectedSourceID: Number(source.id),
      });
    } else {
      this.setState({
        nameInputValue: '',
        organizationInputValue: '',
        phonesInputValue: '',
        emailsInputValue: '',
        notesInputValue: '',
        selectedSourceID: -1,
      });
    }
  };

  /**
   * Updates the state of the modal on a change of the value of the respective input field.
   */
  private onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.currentTarget;

    switch (event.currentTarget.id) {
      case 'name':
        this.setState({ nameInputValue: value });
        break;
      case 'organization':
        this.setState({ organizationInputValue: value });
        break;
      case 'phones':
        this.setState({ phonesInputValue: value });
        break;
      case 'emails':
        this.setState({ emailsInputValue: value });
        break;
      case 'notes':
        this.setState({ notesInputValue: value });
        break;
      default:
        break;
    }
  };

  /**
   * Makes a GraphQL request to update a selected source. Should only be used by an edit modal.
   */
  private updateSource = async (event: React.FormEvent<HTMLInputElement>) => {
    // Prevent default because we don't want a page refresh
    event.preventDefault();

    const {
      selectedSourceID: sourceToUpdateID,
      nameInputValue: name,
      organizationInputValue: organization,
      phonesInputValue: phones,
      emailsInputValue: emails,
      notesInputValue: notes,
    } = this.state;

    await this.props.updateSource({
      // `variables` gives GraphQL which variables to update
      variables: {
        id: sourceToUpdateID,
        name,
        organization,
        phones,
        emails,
        notes,
      },
      // `update` lets update update the local GraphQL cache so we don't have to refresh to see changes
      update: store => {
        // Get data from cache
        const data = store.readQuery({ query: sourcesQuery });

        // Find source by id, update it.
        const sourceToUpdate = data.sources.find(source => {
          return Number(source.id) === sourceToUpdateID;
        });
        Object.assign(sourceToUpdate, {
          id: sourceToUpdateID,
          name,
          organization,
          phones,
          emails,
          notes,
        });

        // Write modified data back to cache
        store.writeQuery({ query: sourcesQuery, data });
      },
    });

    // Close the modal after submit
    this.props.onRequestClose();
  };
}

export default compose(
  graphql(addSource, { name: 'addSource' }),
  graphql(updateSource, { name: 'updateSource' })
)(SourceTableCreateUpdateModal);
