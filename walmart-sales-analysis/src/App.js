import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ChartDisplay from './components/ChartDisplay';
import Insights from './components/Insights';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [aggregation, setAggregation] = useState('Monthly'); // New state for aggregation

  return (
    <div className="container">
      <h1>Dynamic Data Analysis</h1>
      <FileUpload setData={setData} setColumns={setColumns} />
      {data.length > 0 && (
        <>
          <div className="aggregation-selector">
            <label>
              Aggregation Level:
              <select value={aggregation} onChange={(e) => setAggregation(e.target.value)}>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Half-Yearly">Half-Yearly</option>
                <option value="Annual">Annual</option>
              </select>
            </label>
          </div>
          <ChartDisplay data={data} columns={columns} aggregation={aggregation} />
          <Insights data={data} aggregation={aggregation} />
        </>
      )}
    </div>
  );
}

export default App;
