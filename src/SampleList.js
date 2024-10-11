import React from 'react';
import MapComponent from './MapComponent';

function SampleList({ samples, onEdit, onDelete }) {
  return (
    <div>
      <h3>Daftar Sampel</h3>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Tgl Input</th>
            <th>Nama Client</th>
            <th>Judul Sampel</th>
            <th>Jenis Sampel</th>
            <th>Berat Sampel</th>
            <th>Unit</th>
            <th>Tujuan Uji</th>
            <th>Lampiran</th>
            <th>Lokasi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{new Date().toLocaleDateString()}</td>
              <td>{sample.client}</td>
              <td>{sample.title}</td>
              <td>{sample.sampleType}</td>
              <td>{sample.weight}</td>
              <td>{sample.unit}</td>
              <td>{sample.testType}</td>
              <td>
                {sample.attachments.map((file, i) => {
                  const fileUrl = URL.createObjectURL(file); // Generate temporary URL for file
                  const fileType = file.type;

                  // If the file is an image, display a preview
                  if (fileType.startsWith('image/')) {
                    return (
                      <div key={i} style={{ marginBottom: '10px' }}>
                        <img
                          src={fileUrl}
                          alt={file.name}
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      </div>
                    );
                  }

                  // If the file is not an image, display a link to download or view the file
                  return (
                    <div key={i} style={{ marginBottom: '10px' }}>
                      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                        {file.name} ({fileType})
                      </a>
                    </div>
                  );
                })}
              </td>
              <td>
                <MapComponent location={sample.location} />
              </td>
              <td>
                <button onClick={() => onEdit(sample, index)}>Edit</button>
                <button onClick={() => onDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SampleList;
