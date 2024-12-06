import React from 'react';

const Insights = ({ data, xAxis, yAxis }) => {
  if (!data || data.length === 0 || !xAxis || !yAxis) return null;

  const total = data.reduce((sum, row) => sum + parseFloat(row[yAxis] || 0), 0);
  const max = Math.max(...data.map((row) => parseFloat(row[yAxis] || 0)));
  const uniqueXValues = [...new Set(data.map((row) => row[xAxis]))].length;

  return (
    <div>
      <h2>Insights</h2>
      <ul>
        <li>Total {yAxis}: {total.toFixed(2)}</li>
        <li>Maximum {yAxis}: {max.toFixed(2)}</li>
        <li>Unique {xAxis} values: {uniqueXValues}</li>
      </ul>
    </div>
  );
};

export default Insights;
