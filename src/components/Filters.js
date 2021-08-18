import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const columns = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

const Filters = () => {
  const { setName, filters,
    setNumericValues, launchNumericFilters } = useContext(AppContext);
  const { filterByNumericValues } = filters;
  const filterByname = ({ target: { value } }) => {
    setName(value);
  };

  const handleChange = ({ target: { name, value } }) => {
    const fixedValue = name === 'value' ? Number(value) : value;
    setNumericValues({ ...filterByNumericValues[0], [name]: fixedValue });
  };

  return (
    <div>
      <label htmlFor="name">
        Filter by name
        <input
          name="name"
          type="text"
          data-testid="name-filter"
          onChange={ filterByname }
        />
      </label>
      <span>Filter by numerical values</span>
      <label htmlFor="column">
        Column
        <select name="column" data-testid="column-filter" onChange={ handleChange }>
          <option value="">Choose column</option>
          { columns.map((column) => <option key={ column }>{ column }</option>) }
        </select>
      </label>
      <label htmlFor="comparison">
        Comparison
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          <option value="">Choose comparison</option>
          <option>maior que</option>
          <option>igual a</option>
          <option>menor que</option>
        </select>
      </label>
      <label htmlFor="value">
        Value
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          onChange={ handleChange }
          defaultValue="0"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ launchNumericFilters }
      >
        Filter
      </button>
    </div>
  );
};

export default Filters;
