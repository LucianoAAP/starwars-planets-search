import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import AppContext from './AppContext';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [numericValues, setNumericValues] = useState({
    column: '',
    comparison: '',
    value: 0,
  });
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

  const launchNumericFilters = () => {
    const { column, comparison, value } = numericValues;
    if (column.length !== 0 && comparison.length !== 0) {
      if (comparison === 'maior que') {
        const filteredData = planets.filter((planet) => Number(planet[column]) > value);
        setData(filteredData);
      } else if (comparison === 'igual a') {
        const filteredData = planets.filter((planet) => Number(planet[column]) === value);
        setData(filteredData);
      } else {
        const filteredData = planets.filter((planet) => Number(planet[column]) < value);
        setData(filteredData);
      }
    } else {
      setData(planets);
    }
  };

  const contextValue = {
    planets,
    data,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: [numericValues],
    },
    setName,
    setNumericValues,
    launchNumericFilters,
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
