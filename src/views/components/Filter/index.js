import React from 'react';
import './style.scss';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <input
        type="text"
        name="filter"
        placeholder="Search"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default Filter;
