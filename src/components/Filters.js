import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Filters = () => {
  const { setName } = useContext(AppContext);
  const filterByname = ({ target: { value } }) => {
    setName(value);
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
    </div>
  );
};

export default Filters;
