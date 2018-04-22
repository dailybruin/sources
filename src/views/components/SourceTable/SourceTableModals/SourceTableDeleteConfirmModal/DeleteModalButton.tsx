import * as React from 'react';
import glamorous from 'glamorous';

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

export default DeleteModalButton;
