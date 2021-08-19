import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const SetFilters = () => {
  const { filters, removeFilter } = useContext(AppContext);
  const { filterByNumericValues } = filters;
  const index = filterByNumericValues.length - 1;
  const setFilters = filterByNumericValues
    .filter((filter) => filter !== filterByNumericValues[index]);
  if (setFilters.length > 0) {
    return (
      <div>
        {
          setFilters.map((filter, key) => {
            const { column, comparison, value } = filter;
            return (
              <div key={ key } data-testid="filter">
                <p>{ `${column} ${comparison} ${value}` }</p>
                <button type="button" onClick={ () => removeFilter(key) }>X</button>
              </div>
            );
          })
        }
      </div>
    );
  }
  return <div>No filter set</div>;
};

export default SetFilters;
