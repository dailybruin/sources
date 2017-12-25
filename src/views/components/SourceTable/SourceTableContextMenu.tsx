import * as React from 'react';
import { ContextMenu, Item, Separator, IconFont } from 'react-contexify';

function onClick(targetNode, ref, data) {
  // targetNode refer to the html node on which the menu is triggered
  console.log(targetNode);
  // ref will be the mounted instance of the wrapped component
  // If you wrap more than one component, ref will be an array of ref
  console.log(ref);
  // Additionnal data props passed down to the `Item`
  console.log(data);
}

const SourceTableContextMenu = () => (
  <ContextMenu id="menu_id">
    <Item
      leftIcon={<IconFont className="fas fa-pencil-alt" />}
      onClick={onClick}
    >
      Edit
    </Item>
    <Item leftIcon={<IconFont className="fas fa-times" />} onClick={onClick}>
      Remove
    </Item>
  </ContextMenu>
);

export default SourceTableContextMenu;
