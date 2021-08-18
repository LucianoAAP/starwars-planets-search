import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import AppContext from './AppContext';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  useEffect(() => {
    const fetchPlanets = () => {
      fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((results) => results.json())
        .then((results) => {
          setPlanets(results.results);
          setData(results.results);
        });
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    const newData = planets
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
    setData(newData);
  }, [planets, name]);

  const contextValue = {
    planets,
    data,
    filters: {
      filterByName: {
        name,
      },
    },
    setName,
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
