import React, { useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  RadarController,
  DoughnutController,
  PolarAreaController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Pie, Line, Radar, Doughnut, PolarArea } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  RadarController,
  DoughnutController,
  PolarAreaController,
  CategoryScale,
  LinearScale,
  RadialLinearScale, // Required for Radar and PolarArea charts
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartDisplay = ({ data, columns }) => {
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('Bar');

  // Define colors for different chart types
  const colors = {
    Bar: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
    Pie: ['rgba(255, 205, 86, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(201, 203, 207, 0.6)'],
    Line: ['rgba(54, 162, 235, 0.6)'],
    Radar: ['rgba(255, 159, 64, 0.6)'],
    Doughnut: ['rgba(105, 159, 64, 0.6)', 'rgba(255, 140, 64, 0.6)'],
    PolarArea: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
  };

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
        backgroundColor: colors[chartType],
        borderColor: colors[chartType].map((color) => color.replace('0.6', '1')),
        borderWidth: 1,
        tension: chartType === 'Line' ? 0.4 : undefined, // Smoothing for line chart
      },
    ],
  };

  const renderChart = () => {
    switch (chartType) {
      case 'Bar':
        return <Bar data={chartData} />;
      case 'Pie':
        return <Pie data={chartData} />;
      case 'Line':
        return <Line data={chartData} />;
      case 'Radar':
        return (
          <Radar
            data={{
              labels: filteredData.map((row) => row.x),
              datasets: [
                {
                  label: yAxis,
                  data: filteredData.map((row) => row.y),
                  backgroundColor: 'rgba(255, 159, 64, 0.6)',
                  borderColor: 'rgba(255, 159, 64, 1)',
                  borderWidth: 2,
                },
              ],
            }}
          />
        );
      case 'Doughnut':
        return <Doughnut data={chartData} />;
      case 'PolarArea':
        return (
          <PolarArea
            data={{
              labels: filteredData.map((row) => row.x),
              datasets: [
                {
                  data: filteredData.map((row) => row.y),
                  backgroundColor: colors.PolarArea,
                  borderWidth: 1,
                },
              ],
            }}
          />
        );
      default:
        return <p>Select a valid chart type.</p>;
    }
  };

  return (
    <div>
      <h2>Dynamic Multi-Chart Display</h2>
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
        <label>
          Chart Type:
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="Bar">Bar Chart</option>
            <option value="Pie">Pie Chart</option>
            <option value="Line">Line Chart</option>
            <option value="Radar">Radar Chart</option>
            <option value="Doughnut">Doughnut Chart</option>
            <option value="PolarArea">Polar Area Chart</option>
          </select>
        </label>
      </div>
      {xAxis && yAxis ? renderChart() : <p>Please select X and Y axes and chart type.</p>}
    </div>
  );
};

export default ChartDisplay;
