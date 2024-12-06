import React, { useState } from 'react';
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChartDisplay = ({ data, columns }) => {
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');

  // Filter data if both axes are selected
  const filteredData = data.map((row) => ({
    x: row[xAxis],
    y: parseFloat(row[yAxis] || 0),
  }));

  const chartData = {
    labels: filteredData.map((row) => row.x),
    datasets: [
      {
        label: yAxis,
        data: filteredData.map((row) => row.y),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Dynamic Chart</h2>
      <div>
        <label>
          X-Axis:
          <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
            <option value="">Select Column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </label>
        <label>
          Y-Axis:
          <select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
            <option value="">Select Column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </label>
      </div>
      {xAxis && yAxis ? <Bar data={chartData} /> : <p>Please select X and Y axes.</p>}
    </div>
  );
};

export default ChartDisplay;
