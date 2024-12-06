import React from 'react';
import Papa from 'papaparse';

const FileUpload = ({ setData, setColumns }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data); // Pass the parsed data
          setColumns(Object.keys(result.data[0])); // Extract and set column names
        },
      });
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;
