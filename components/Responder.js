import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Responder.css';

function Responder() {
  const navigate = useNavigate();

  const handleMapRedirect = () => {
    navigate('/reslocation'); 
  };

  return (
    <div className="responder-container">
      <div className="image-wrapper">
        <img src="/img/ambulance.png" className="ambulance-img" alt="Ambulance" />
      </div>
      <h2>Help is on the way</h2>
      <p>A responder has been dispatched to your location.</p>
      <button className="map-button" onClick={handleMapRedirect}>
        See responder on map
      </button>
    </div>
  );
}

export default Responder;
