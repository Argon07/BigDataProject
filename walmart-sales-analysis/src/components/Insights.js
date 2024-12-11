import React from 'react';

const Insights = ({ data, aggregation }) => {
  if (!data || data.length === 0) return null;

  const computeInsights = () => {
    let groupedData = {};

    switch (aggregation) {
      case 'Annual':
        groupedData = data.reduce((acc, row) => {
          const year = row['Year'];
          if (!acc[year]) acc[year] = 0;
          acc[year] += parseFloat(row['Sales'] || 0);
          return acc;
        }, {});
        break;

      case 'Half-Yearly':
        groupedData = data.reduce((acc, row) => {
          const half = row['Month'] <= 6 ? `H1 ${row['Year']}` : `H2 ${row['Year']}`;
          if (!acc[half]) acc[half] = 0;
          acc[half] += parseFloat(row['Sales'] || 0);
          return acc;
        }, {});
        break;

      case 'Quarterly':
        groupedData = data.reduce((acc, row) => {
          const quarter = `Q${Math.ceil(row['Month'] / 3)} ${row['Year']}`;
          if (!acc[quarter]) acc[quarter] = 0;
          acc[quarter] += parseFloat(row['Sales'] || 0);
          return acc;
        }, {});
        break;

      case 'Monthly':
      default:
        groupedData = data.reduce((acc, row) => {
          const month = `${row['Month']} ${row['Year']}`;
          if (!acc[month]) acc[month] = 0;
          acc[month] += parseFloat(row['Sales'] || 0);
          return acc;
        }, {});
        break;
    }

    const total = Object.values(groupedData).reduce((sum, value) => sum + value, 0);
    const max = Math.max(...Object.values(groupedData));

    return { total, max, groupedData };
  };

  const { total, max, groupedData } = computeInsights();

  return (
    <div>
      <h2>Insights</h2>
      <ul>
        <li>Total Sales: {total.toFixed(2)}</li>
        <li>Maximum Sales: {max.toFixed(2)}</li>
        <li>Breakdown:
          <ul>
            {Object.entries(groupedData).map(([key, value]) => (
              <li key={key}>{key}: {value.toFixed(2)}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Insights;
