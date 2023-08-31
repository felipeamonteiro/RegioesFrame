import { useEffect, useState } from 'react';
import './App.css';

function RegionScreen({ regionData }) {
  return (
    <div className="state-list">
      <h5>Região: {regionData.Região}</h5>
      <table>
        <thead>
          <tr>
            <th>Bandeira</th>
            <th>Nome</th>
            <th>Capital</th>
            <th>População</th>
          </tr>
        </thead>
        <tbody>
          {regionData.regiao.map((state, stateIndex) => (
            <tr key={stateIndex}>
              <td>
                <img src={state.Bandeira} alt={`${state.Estado} Bandeira`} />
              </td>
              <td>{state.Estado}</td>
              <td>{state.Capital}</td>
              <td>{state.População}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [regionData, setRegionData] = useState([]);
  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);

  useEffect(() => {
    const url = 'https://raw.githubusercontent.com/LuizLimaG/APIFrame/main/app.json';
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setRegionData(result);
      });
  }, []);

  const selectedRegion = regionData[currentRegionIndex];

  return (
    <>
      <h1>Desafio - Estados do Brasil</h1>
      <div className="region-selection">
        {regionData.map((region, index) => (
          <button key={index} onClick={() => setCurrentRegionIndex(index)}>
            {region.Região}
          </button>
        ))}
      </div>
      {selectedRegion && <RegionScreen regionData={selectedRegion} />}
    </>
  )
}

export default App;