import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ChartDisplay from './components/ChartDisplay';
import Insights from './components/Insights';
import './App.css'; // Import CSS file

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="container">
      <h1>Walmart Sales Analysis</h1>
      <FileUpload setData={setData} />
      {data.length > 0 && (
        <>
          <div className="chart-container">
            <ChartDisplay data={data} />
          </div>
          <Insights data={data} />
        </>
      )}
    </div>
  );
}

export default App;
