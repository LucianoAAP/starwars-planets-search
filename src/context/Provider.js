import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import AppContext from './AppContext';

const INITIAL_COLUMNS = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];
const INITIAL_NUMERIC_VALUES = {
  column: 'population',
  comparison: '',
  value: 0,
};

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [numericValues, setNumericValues] = useState(INITIAL_NUMERIC_VALUES);
  const [filterByNumericValues, setFilters] = useState([]);
  const [columns, setTotalColumns] = useState(INITIAL_COLUMNS);
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
    const filteredData = filterByNumericValues.reduce((acc, curr) => {
      const { column, comparison, value } = curr;
      const handleFilter = (arr) => {
        if (column.length !== 0 && comparison.length !== 0) {
          if (comparison === 'maior que') {
            return arr.filter((planet) => Number(planet[column]) > value);
          }
          if (comparison === 'igual a') {
            return arr.filter((planet) => Number(planet[column]) === value);
          }
          return arr.filter((planet) => Number(planet[column]) < value);
        }
        return arr;
      };
      return handleFilter(acc);
    }, newData);
    setData(filteredData);
    const getNewColumns = async () => {
      if (filterByNumericValues.length > 0) {
        const setColumns = filterByNumericValues.reduce((acc, curr) => {
          const { column: currColumn } = curr;
          const filteredColumns = acc.filter((getColumn) => getColumn !== currColumn);
          return filteredColumns;
        }, INITIAL_COLUMNS);
        await setTotalColumns(setColumns);
        await setNumericValues({ ...INITIAL_NUMERIC_VALUES, column: setColumns[0] });
      }
    };
    getNewColumns();
  }, [planets, name, filterByNumericValues]);

  const launchNumericFilters = () => {
    const { column, comparison } = numericValues;
    if (column.length !== 0 && comparison.length !== 0) {
      setFilters([...filterByNumericValues, numericValues]);
    }
  };

  const removeFilter = (index) => {
    const newFilters = filterByNumericValues
      .filter((filter) => filter !== filterByNumericValues[index]);
    setFilters(newFilters);
  };

  const contextValue = {
    planets,
    data,
    numericValues,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues,
    },
    columns,
    setName,
    setNumericValues,
    launchNumericFilters,
    removeFilter,
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
