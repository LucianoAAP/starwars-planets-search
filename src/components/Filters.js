import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import NumericFilter from './NumericFilter';
import SetFilters from './SetFilters';

const Filters = () => {
  const { setName } = useContext(AppContext);

  const filterByname = ({ target: { value } }) => {
    setName(value);
  };
  return (
    <div>
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
      </div>
      <NumericFilter />
      <SetFilters />
    </div>
  );
};

export default Filters;
