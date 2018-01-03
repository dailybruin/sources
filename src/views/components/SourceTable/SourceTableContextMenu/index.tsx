import * as React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';

// react-contextmenu is styled via a stylesheet
import './style.scss';

const SourceTableContextMenu = props => (
  <ContextMenu id="menu_id">
    <MenuItem onClick={props.onEdit}>
      <i className="fas fa-pencil-alt" /> Edit
    </MenuItem>
    <MenuItem onClick={props.onRemove}>
      <i className="fas fa-times" /> Remove
    </MenuItem>
  </ContextMenu>
);

export default SourceTableContextMenu;
