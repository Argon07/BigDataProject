import React from 'react';

const Insights = ({ data }) => {
  if (!data || data.length === 0) return null;

  const totalSales = data.reduce((sum, row) => sum + parseFloat(row.sales || 0), 0); // Adjust column name
  const maxSale = Math.max(...data.map((row) => parseFloat(row.sales || 0))); // Adjust column name

  return (
    <div>
      <h2>Insights</h2>
      <ul>
        <li>Total Sales: ${totalSales.toFixed(2)}</li>
        <li>Highest Sale: ${maxSale.toFixed(2)}</li>
      </ul>
    </div>
  );
};

export default Insights;
