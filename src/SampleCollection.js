import React, { useState, useEffect } from 'react';
import { getCurrentLocation } from './utils'; // utility function for geolocation
import './SampleCollection.css'; // Ensure this file exists and includes the new styles
import Navbar from './Navbar'; // Import the Navbar component

function SampleCollection({ addSample, editSample }) {
  const [client, setClient] = useState('');
  const [title, setTitle] = useState('');
  const [sampleType, setSampleType] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [testType, setTestType] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (editSample) {
      setClient(editSample.client);
      setTitle(editSample.title);
      setSampleType(editSample.sampleType);
      setWeight(editSample.weight);
      setUnit(editSample.unit);
      setTestType(editSample.testType);
      setAttachments(editSample.attachments);
      setLocation(editSample.location);
    }
  }, [editSample]);

  const handleFileChange = (e) => {
    setAttachments([...attachments, ...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentLocation = await getCurrentLocation();
    const newSample = {
      client,
      title,
      sampleType,
      weight,
      unit,
      testType,
      attachments,
      location: currentLocation || location, // use existing location if editing
    };
    addSample(newSample);
    resetForm();
  };

  const resetForm = () => {
    setClient('');
    setTitle('');
    setSampleType('');
    setWeight('');
    setUnit('');
    setTestType('');
    setAttachments([]);
    setLocation(null);
  };

  return (
    <div>
      <div className="sample-collection-container">
        <h3>{editSample ? 'Edit Sampel' : 'Tambah Sampel'}</h3>
        <form onSubmit={handleSubmit} className="sample-form">
          <select
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
          >
            <option value="">Pilih Client</option>
            <option value="PT A">PT A</option>
            <option value="PT B">PT B</option>
            <option value="PT C">PT C</option>
          </select>
          <input
            type="text"
            placeholder="Judul Sampel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select
            value={sampleType}
            onChange={(e) => setSampleType(e.target.value)}
            required
          >
            <option value="">Jenis Sampel</option>
            <option value="Tanah">Tanah</option>
            <option value="Air">Air</option>
            <option value="Udara">Udara</option>
          </select>
          <input
            type="number"
            placeholder="Berat Sampel"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          >
            <option value="">Unit Satuan</option>
            <option value="mg">mg</option>
            <option value="gr">gr</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
          </select>
          <select
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            required
          >
            <option value="">Tujuan Uji</option>
            <option value="Uji Asam">Uji Asam</option>
            <option value="Uji Ph">Uji Ph</option>
            <option value="Uji Struktur">Uji Struktur</option>
          </select>
          <input type="file" multiple onChange={handleFileChange} />
          <button type="submit" className="submit-button">
            {editSample ? 'Update Sampel' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SampleCollection;
