import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const NumericFilter = () => {
  const { numericValues, setNumericValues,
    launchNumericFilters, columns } = useContext(AppContext);
  const { column, comparison, value: getvalue } = numericValues;

  const handleChange = ({ target: { name, value } }) => {
    const fixedValue = name === 'value' ? Number(value) : value;
    setNumericValues({ ...numericValues, [name]: fixedValue });
  };

  return (
    <div className="numeric-filter">
      <label htmlFor="column">
        Column:
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
        Comparison:
        <select
          name="comparison"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ handleChange }
        >
          <option value="">Choose comparison</option>
          <option>higher than</option>
          <option>equal to</option>
          <option>lower than</option>
        </select>
      </label>
      <label htmlFor="value">
        Value:
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          value={ getvalue }
          onChange={ handleChange }
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

export default NumericFilter;
