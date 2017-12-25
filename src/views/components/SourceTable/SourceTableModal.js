import React from 'react';
import Modal from 'react-modal';

class SourceTableModal extends React.Component {
  state = {
    name: '',
    organization: '',
    phone: '',
    email: '',
    notes: '',
  };

  createSource = async event => {
    event.preventDefault();
    console.log('hi');
    return false;
  };

  render() {
    return (
      <Modal {...this.props}>
        <h1>Add a Source</h1>
        <form onSubmit={this.createSource}>
          <label htmlFor="name">Source Name:</label>
          <input
            id="name"
            onChange={event =>
              this.setState({
                name: event.target.value,
              })
            }
            value={this.state.name}
            type="text"
          />
          <label htmlFor="organization">Source Organization:</label>
          <input
            id="organization"
            onChange={event =>
              this.setState({
                organization: event.target.value,
              })
            }
            value={this.state.organization}
            type="text"
          />
          <label htmlFor="phone">Source Phone:</label>
          <input
            id="phone"
            onChange={event =>
              this.setState({
                phone: event.target.value,
              })
            }
            type="tel"
          />
          <label htmlFor="email">Source Email:</label>
          <input
            type="email"
            onChange={event =>
              this.setState({
                email: event.target.value,
              })
            }
          />
          <label htmlFor="notes">Notes:</label>
          <input
            id="notes"
            onChange={event =>
              this.setState({
                notes: event.target.value,
              })
            }
            type="text"
          />
          <input type="submit" value="Create" />
        </form>
      </Modal>
    );
  }
}

export default SourceTableModal;
