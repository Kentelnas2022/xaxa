import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const ResLocation = () => {
  const navigate = useNavigate();
  const iliganCoordinates = [8.2280, 124.2452]; 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/responderarrive');
    }, 10000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <MapContainer
        center={iliganCoordinates}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <ZoomControl position="bottomright" />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={iliganCoordinates}>
          <Popup>Iligan City, Philippines</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ResLocation;
