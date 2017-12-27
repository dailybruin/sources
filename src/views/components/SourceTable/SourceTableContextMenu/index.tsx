import * as React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import './style.scss';

const SourceTableContextMenu = props => (
  <ContextMenu id="menu_id">
    <MenuItem onClick={props.edit}>
      <i className="fas fa-pencil-alt" /> Edit
    </MenuItem>
    <MenuItem onClick={props.remove}>
      <i className="fas fa-times" /> Remove
    </MenuItem>
  </ContextMenu>
);

export default SourceTableContextMenu;
