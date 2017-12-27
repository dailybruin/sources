import * as React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import './style.scss';

const SourceTableContextMenu = () => (
  <ContextMenu id="menu_id">
    <MenuItem>
      <i className="fas fa-pencil-alt" /> Edit
    </MenuItem>
    <MenuItem>
      <i className="fas fa-times" /> Remove
    </MenuItem>
  </ContextMenu>
);

export default SourceTableContextMenu;
