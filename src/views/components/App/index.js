import React from 'react';
import Header from '../Header';
import AddSourceButton from '../AddSourceButton';
import Filter from '../Filter';
import SourceTable from '../SourceTable';
import './style.scss';

const App = () => (
  <div className="container">
    <Header />
    <AddSourceButton />
    <Filter />
    <SourceTable />
  </div>
);

export default App;
