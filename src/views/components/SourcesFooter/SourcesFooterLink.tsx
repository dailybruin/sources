import * as React from 'react';
import glamorous from 'glamorous';

const linkColor = '#1779ba';
const linkColorHover = '#1468a0';

const SourcesFooterLink = glamorous.a({
  color: linkColor,
  textDecoration: 'none',
  ':hover': {
    color: linkColorHover,
  },
});

export default SourcesFooterLink;
