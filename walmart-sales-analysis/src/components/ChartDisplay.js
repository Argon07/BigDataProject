import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

const ChartDisplay = ({ data }) => {
  const labels = data.map((row) => row.date); // Adjust according to your CSV structure
  const salesData = data.map((row) => parseFloat(row.sales)); // Adjust column names

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: salesData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Sales Chart</h2>
      <Bar data={chartData} />
      <Line data={chartData} />
    </div>
  );
};

export default ChartDisplay;
