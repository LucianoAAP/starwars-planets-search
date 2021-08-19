import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Table = () => {
  const { planets, data } = useContext(AppContext);
  if (planets.length === 0) return <p>Loading...</p>;
  if (data.length === 0) return <p>No planet with these parameters</p>;

  const keys = Object.keys(planets[0]).filter((key) => key !== 'residents');

  return (
    <table>
      <thead>
        <tr>
          { keys.map((key) => <th key={ key }>{ key.toUpperCase() }</th>) }
        </tr>
      </thead>
      <tbody>
        { data.map((planet) => (
          <tr key={ planet.name }>
            { keys.map((key) => {
              if (key === 'name') {
                return <td key={ key } data-testid="planet-name">{ planet[key] }</td>;
              }
              return <td key={ key }>{ planet[key] }</td>;
            }) }
          </tr>)) }
      </tbody>
    </table>
  );
};

export default Table;
