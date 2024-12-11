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
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartDisplay = ({ data, columns, aggregation }) => {
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

  const getQuarter = (month) => {
    if (month >= 1 && month <= 3) return 'Q1';
    if (month >= 4 && month <= 6) return 'Q2';
    if (month >= 7 && month <= 9) return 'Q3';
    if (month >= 10 && month <= 12) return 'Q4';
  };

  const groupData = () => {
    switch (aggregation) {
      case 'Annual':
        return data.reduce((acc, row) => {
          const year = row['Year'];
          if (!acc[year]) acc[year] = { label: year, value: 0 };
          acc[year].value += parseFloat(row[yAxis] || 0);
          return acc;
        }, {});

      case 'Half-Yearly':
        return data.reduce((acc, row) => {
          const half = row['Month'] <= 6 ? `H1 ${row['Year']}` : `H2 ${row['Year']}`;
          if (!acc[half]) acc[half] = { label: half, value: 0 };
          acc[half].value += parseFloat(row[yAxis] || 0);
          return acc;
        }, {});

      case 'Quarterly':
        return data.reduce((acc, row) => {
          const quarter = `${getQuarter(row['Month'])} ${row['Year']}`;
          if (!acc[quarter]) acc[quarter] = { label: quarter, value: 0 };
          acc[quarter].value += parseFloat(row[yAxis] || 0);
          return acc;
        }, {});

      case 'Monthly':
      default:
        return data.map((row) => ({
          label: `${row['Month']} ${row['Year']}`,
          value: parseFloat(row[yAxis] || 0),
        }));
    }
  };

  const aggregatedData = Object.values(groupData());
  const chartData = {
    labels: aggregatedData.map((item) => item.label),
    datasets: [
      {
        label: yAxis,
        data: aggregatedData.map((item) => item.value),
        backgroundColor: colors[chartType],
        borderColor: colors[chartType].map((color) => color.replace('0.6', '1')),
        borderWidth: 1,
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
        return <Radar data={chartData} />;
      case 'Doughnut':
        return <Doughnut data={chartData} />;
      case 'PolarArea':
        return <PolarArea data={chartData} />;
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
