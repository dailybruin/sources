import * as React from 'react';
import { Div } from 'glamorous';

import SourcesHeader from './SourcesHeader';
// import SourceTable from './SourceTable';
import SourcesFooter from './SourcesFooter';

const App = () => (
  <Div
    display="flex"
    flexDirection="column"
    justifyContent="center"
    margin="0 50px"
  >
    <SourcesHeader />
    {/* <SourceTable /> */}
    <SourcesFooter />
  </Div>
);

export default App;
