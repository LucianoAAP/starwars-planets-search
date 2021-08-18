import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import AppContext from './AppContext';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    const fetchPlanets = () => {
      fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((results) => results.json())
        .then((results) => setPlanets(results.results));
    };
    fetchPlanets();
  }, []);

  const contextValue = {
    data: planets,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
};

Provider.propTypes = {
  children: Proptypes.node.isRequired,
};

export default Provider;
