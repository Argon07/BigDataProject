import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ChartDisplay from './components/ChartDisplay';
import Insights from './components/Insights';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');

  return (
    <div className="container">
      <h1>Dynamic Data Analysis</h1>
      <FileUpload setData={setData} setColumns={setColumns} />
      {data.length > 0 && (
        <>
          <ChartDisplay data={data} columns={columns} />
          <Insights data={data} xAxis={xAxis} yAxis={yAxis} />
        </>
      )}
    </div>
  );
}

export default App;
