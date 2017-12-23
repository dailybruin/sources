import React from 'react';
import Header from '../Header';
import Filter from '../Filter';
import SourceTable from '../SourceTable';
import './style.scss';

const App = () => (
  <div className="container">
    <Header />
    <Filter />
    <SourceTable />
  </div>
);

export default App;
