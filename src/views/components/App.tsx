import * as React from 'react';
import { Div } from 'glamorous';

import Header from '../Header';
import SourceTable from '../SourceTable';

const App = () => (
  <Div
    display="flex"
    flexDirection="column"
    justifyContent="center"
    margin="0 50px"
  >
    <Header />
    <SourceTable />
  </Div>
);

export default App;
