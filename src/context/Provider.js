import React, { useCallback, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import AppContext from './AppContext';

const INITIAL_COLUMNS = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];
const INITIAL_NUMERIC_VALUES = {
  column: 'population',
  comparison: '',
  value: 0,
};

const INITIAL_ORDER = {
  column: 'Name',
  sort: 'ASC',
};

const MINUS_ONE = -1;

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [numericValues, setNumericValues] = useState(INITIAL_NUMERIC_VALUES);
  const [filterByNumericValues, setFilters] = useState([]);
  const [columns, setTotalColumns] = useState(INITIAL_COLUMNS);
  const [order, setOrder] = useState(INITIAL_ORDER);
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

  const set = (z, par) => {
    if (z[par] === 'unknown') return 0;
    if (Number.isNaN(Number(z[par]))) return z[par];
    return Number(z[par]);
  };

  const sortData = useCallback((dataToSort) => {
    const { column, sort } = order;
    const key = column.toLowerCase();
    if (sort === 'ASC') {
      return dataToSort.sort((a, b) => {
        const x = set(a, key);
        const y = set(b, key);
        if (x < y) return MINUS_ONE;
        if (x > y) return 1;
        return 0;
      });
    }
    return dataToSort.sort((a, b) => {
      const x = set(a, key);
      const y = set(b, key);
      if (x > y) return MINUS_ONE;
      if (x < y) return 1;
      return 0;
    });
  }, [order]);

  useEffect(() => {
    const sortedData = sortData(planets);
    const newData = sortedData
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
      const setColumns = filterByNumericValues.reduce((acc, curr) => {
        if (Object.keys(curr).length !== 0) {
          const { column: currColumn } = curr;
          const filteredColumns = acc.filter((getColumn) => getColumn !== currColumn);
          return filteredColumns;
        }
        return acc;
      }, INITIAL_COLUMNS);
      await setTotalColumns(setColumns);
      await setNumericValues({ ...INITIAL_NUMERIC_VALUES, column: setColumns[0] });
    };
    getNewColumns();
  }, [planets, name, filterByNumericValues, sortData]);

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
      order,
    },
    columns,
    initialColumns: INITIAL_COLUMNS,
    initialOrder: INITIAL_ORDER,
    setName,
    setNumericValues,
    launchNumericFilters,
    removeFilter,
    setOrder,
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
