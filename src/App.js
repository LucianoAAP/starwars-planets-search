import React, { useContext } from 'react';
import './App.css';
import AppContext from './context/AppContext';
import Table from './components/Table';

function App() {
  const { data } = useContext(AppContext);
  return (
    <Table planets={ data } />
  );
}

export default App;
