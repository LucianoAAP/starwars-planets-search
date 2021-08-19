import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Filter = () => {
  const { numericValues, setNumericValues,
    launchNumericFilters, columns } = useContext(AppContext);
  const { column, comparison, value: getvalue } = numericValues;

  const handleChange = ({ target: { name, value } }) => {
    const fixedValue = name === 'value' ? Number(value) : value;
    setNumericValues({ ...numericValues, [name]: fixedValue });
  };

  return (
    <div>
      <label htmlFor="column">
        Column
        <select
          name="column"
          data-testid="column-filter"
          value={ column }
          onChange={ handleChange }
        >
          { columns
            .map((setColumn) => <option key={ setColumn }>{ setColumn }</option>) }
        </select>
      </label>
      <label htmlFor="comparison">
        Comparison
        <select
          name="comparison"
          data-testid="comparison-filter"
          value={ comparison }
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
          value={ getvalue }
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

export default Filter;
