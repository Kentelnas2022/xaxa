import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Responder.css';

function Responder() {
  const navigate = useNavigate();

  const handleMapRedirect = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="responder-container">
      <div className="image-wrapper">
        <img src="/img/arrived.png" className="ambulance-img" alt="Ambulance" />
      </div>
      <h2>Responder Has Been Arrived</h2>
      <p>Please stay calm. Medical or emergency personnel are now assisting you. If you’re able, follow their instructions for your safety.</p>
      <div className="dot-loader">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
      <button className="map-button" onClick={handleMapRedirect}>
        Dashboard
      </button>
    </div>
  );
}

export default Responder;
