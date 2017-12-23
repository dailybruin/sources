import React from 'react';
import Filter from './Filter';
import SourceList from './SourceList';

const App = () => (
  <React.Fragment>
    <h1>Sources</h1>
    <Filter />
    <SourceList />
  </React.Fragment>
);

export default App;
