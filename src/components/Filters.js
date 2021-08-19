import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import NumericFilter from './NumericFilter';
import SetFilters from './SetFilters';

const Filters = () => {
  const { setName, initialColumns, setOrder, filters } = useContext(AppContext);

  const filterByname = ({ target: { value } }) => {
    setName(value);
  };

  const handleOrder = ({ target: { name, value } }) => {
    const { order } = filters;
    setOrder({ ...order, [name]: value });
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
      <div>
        <label htmlFor="column-sort">
          Sort by
          <select name="column" data-testid="column-sort" onChange={ handleOrder }>
            <option>Name</option>
            { initialColumns.map((column) => <option key={ column }>{ column }</option>) }
          </select>
        </label>
        <label htmlFor="asc">
          ASC
          <input
            name="sort"
            id="asc"
            type="radio"
            testid="column-sort-input-asc"
            value="ASC"
            defaultChecked
            onClick={ handleOrder }
          />
        </label>
        <label htmlFor="des">
          DES
          <input
            name="sort"
            id="des"
            type="radio"
            data-testid="column-sort-input-desc"
            value="DES"
            onClick={ handleOrder }
          />
        </label>
        <button type="button" data-testid="column-sort-button">Sort</button>
      </div>
      <NumericFilter />
      <SetFilters />
    </div>
  );
};

export default Filters;
