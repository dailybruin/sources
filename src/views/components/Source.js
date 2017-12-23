import React from 'react';
import PropTypes from 'prop-types';

const Source = props => (
  <div>
    <div>{props.name}</div>
  </div>
);
Source.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Source;
