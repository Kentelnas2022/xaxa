import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Default marker icon setup
let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const Location = () => {
  const navigate = useNavigate();
  const iliganCoordinates = [8.2280, 124.2452]; // Iligan City

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      {/* Back Icon Button */}
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          zIndex: 1000,
          backgroundColor: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
        }}
      >
        <i className="fas fa-arrow-left" style={{ color: '#1A2A4D', fontSize: '18px' }}></i>
      </button>

      {/* Map with bottom-right zoom controls */}
      <MapContainer
        center={iliganCoordinates}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false} // Disable default top-left control
        style={{ height: '100%', width: '100%' }}
      >
        {/* Add zoom control manually to bottomright */}
        <ZoomControl position="bottomright" />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={iliganCoordinates}>
          <Popup>Iligan City, Philippines</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Location;
