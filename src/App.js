import React from 'react';
import './App.css';
import Title from './components/Title';
import Table from './components/Table';
import Filters from './components/Filters';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Title />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
