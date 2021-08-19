import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import NumericFilter from './NumericFilter';
import SetFilters from './SetFilters';

const Filters = () => {
  const { setName, initialColumns, setOrder, initialOrder } = useContext(AppContext);

  const [newOrder, setNewOrder] = useState(initialOrder);

  const filterByname = ({ target: { value } }) => {
    setName(value);
  };

  const handleOrder = ({ target: { name, value } }) => {
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleSort = () => {
    setOrder(newOrder);
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
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSort }
        >
          Sort
        </button>
      </div>
      <NumericFilter />
      <SetFilters />
    </div>
  );
};

export default Filters;
