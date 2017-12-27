import * as React from 'react';

import Header from '../Header';
import SourceTable from '../SourceTable';
import './style.scss';

const App = () => (
  <div className="container">
    <Header />
    <SourceTable />
  </div>
);

export default App;
