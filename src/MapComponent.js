import React from 'react';

function MapComponent({ location }) {
  if (!location) return <span>No Location</span>;

  const { latitude, longitude } = location;
  return (
    <div>
      <p>{`Lat: ${latitude}, Lon: ${longitude}`}</p>
      {/* You can integrate Google Maps or Leaflet for a real map preview */}
    </div>
  );
}

export default MapComponent;
