import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './css/History.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [helmetImage, setHelmetImage] = useState(null);

  useEffect(() => {
    const imageData = localStorage.getItem('helmetImage');
    if (imageData) {
      setHelmetImage(imageData);
    }
  }, []);

  return (
    <div>
      <header className="header edit-header">
  <button className="back-button" onClick={() => navigate(-1)}>
    <FaArrowLeft />
  </button>
  <h2>History Log</h2>
</header>

      <main className="main-content">
        <div className="history-log-container">
          <div className="history-card history-critical">
            <div className="history-date">2025-06-04 15:20</div>
            <div className="history-incident">Accident detected</div>
            <div className="history-location">Downtown Intersection</div>
          </div>
          <div className="history-card history-warning">
            <div className="history-date">2025-06-03 10:12</div>
            <div className="history-incident">Helmet dropped</div>
            <div className="history-location">Main Street</div>
          </div>
          <div className="history-card history-info">
            <div className="history-date">2025-06-01 08:45</div>
            <div className="history-incident">Helmet connected</div>
            <div className="history-location">Home</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
