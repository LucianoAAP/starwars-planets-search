import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const SetFilters = () => {
  const { filters, removeFilter } = useContext(AppContext);
  const { filterByNumericValues } = filters;
  if (filterByNumericValues.length > 0) {
    return (
      <div>
        {
          filterByNumericValues.map((filter, index) => {
            const { column, comparison, value } = filter;
            return (
              <div key={ index } data-testid="filter">
                <p>{ `${column} ${comparison} ${value}` }</p>
                <button type="button" onClick={ () => removeFilter(index) }>X</button>
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
