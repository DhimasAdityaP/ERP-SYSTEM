import React, { useState } from 'react';
import Login from './Login';
import SampleCollection from './SampleCollection';
import SampleList from './SampleList';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin role
  const [samples, setSamples] = useState([]);
  const [editSample, setEditSample] = useState(null); // New state for editing sample

  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === 'adminpassword') {
      setLoggedIn(true);
      setIsAdmin(true);
    } else if (email === 'sales@example.com' && password === 'password') {
      setLoggedIn(true);
      setIsAdmin(false);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setIsAdmin(false);
  };

  const addOrUpdateSample = (newSample) => {
    if (editSample) {
      // Update sample if we're editing an existing one
      setSamples(
        samples.map((sample, index) =>
          index === editSample.index ? newSample : sample
        )
      );
      setEditSample(null); // Clear edit mode
    } else {
      setSamples([...samples, newSample]);
    }
  };

  const handleEdit = (sample, index) => {
    setEditSample({ ...sample, index });
  };

  const handleDelete = (indexToDelete) => {
    setSamples(samples.filter((_, index) => index !== indexToDelete));
  };

  // Function to export samples to CSV
  const exportToCSV = () => {
    const csvRows = [
      // headers
      Object.keys(samples[0] || {}).join(','),
      // data
      ...samples.map(sample => Object.values(sample).join(',')),
    ];
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'samples.csv');
  };

  // Function to export samples to XLSX
  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(samples);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Samples');
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'samples.xlsx');
  };

  return (
    <div>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <h2>Menu Ambil Sampel</h2>
          <button onClick={handleLogout}>Logout</button>
          <SampleCollection
            addSample={addOrUpdateSample}
            editSample={editSample}
          />
          <SampleList
            samples={samples}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {isAdmin && samples.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Export Samples</h3>
              <button onClick={exportToCSV}>Export as CSV</button>
              <button onClick={exportToXLSX} style={{ marginLeft: '10px' }}>
                Export as XLSX
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
