import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [helmetImage, setHelmetImage] = useState(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showCrashMessage, setShowCrashMessage] = useState(false);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const imageData = localStorage.getItem('helmetImage');
    if (imageData) setHelmetImage(imageData);

    const navItems = document.querySelectorAll('.nav-item');
    const highlight = document.querySelector('.nav-highlight');

    navItems.forEach((item, index) => {
      item.classList.remove('active');
      if (index === 0) {
        item.classList.add('active');
        if (highlight) {
          highlight.style.left = `calc(${index * 33.33}% + 16.66% - 30px)`; // ✅ fixed calc string
        }
      }

      item.onclick = () => {
        if (index === 0) navigate('/dashboard');
        else if (index === 1) navigate('/emergency');
        else if (index === 2) navigate('/profile');
      };
    });

    return () => {
      navItems.forEach((item) => {
        item.onclick = null; 
      });
    };
  }, [navigate]);

  useEffect(() => {
    const crashTimer = setTimeout(() => {
      setShowEmergency(true);
      window.navigator.vibrate?.(500);

      setTimeout(() => setShowCrashMessage(true), 3000);
    }, 10000);

    return () => clearTimeout(crashTimer);
  }, []);

  useEffect(() => {
    let countdownTimer;
    if (showCrashMessage) {
      countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            navigate('/responder');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdownTimer);
  }, [showCrashMessage, navigate]);

  const cancelAlert = () => {
    setShowEmergency(false);
    setShowCrashMessage(false);
    setCountdown(15);
  };

  return (
    <div>
      <div className="header-status-card">
        <h2 className="text-section">Dashboard</h2>
      </div>

      <main className="main-content">
      <div className="helmet-status-card">
  <h2>Helmet Status</h2>
  <div className="helmet-status-content">
    <i className="fas fa-hard-hat hat-icon"></i>
    <p className="status-text">Connected</p>
  </div>
  {helmetImage && (
    <div className="helmet-image-container">
      <img src={helmetImage} alt="Helmet" className="helmet-image" />
    </div>
  )}
</div>


        <div className="button-card">
          <button className="nav-button" onClick={() => navigate('/location')}>
            <i className="fas fa-map-marker-alt"></i>
            Helmet Tracker
            <i className="fas fa-chevron-right right-icon"></i>
          </button>

          <button className="nav-button" onClick={() => navigate('/historylog')}>
            <i className="fas fa-history"></i>
            History Log
            <i className="fas fa-chevron-right right-icon"></i>
          </button>
        </div>
      </main>

      <nav className="bottom-nav" id="bottomNav">
        <ul className="nav-list">
          <li className="nav-item active">
            <i className="fas fa-home"></i>
          </li>
          <li className="nav-item">
            <i className="fas fa-phone"></i>
          </li>
          <li className="nav-item">
            <i className="fas fa-user"></i>
          </li>
          <div className="nav-highlight"></div>
        </ul>
      </nav>

      {showEmergency && (
        <div className="crash-animation active">
          <div className="crash-pulse"></div>

          {showCrashMessage && (
            <div className="crash-message-box">
              <h2>Crash Detected!</h2>
              <p>
                Cancel alert if you’re safe.<br />
                Emergency responders will be notified automatically.
              </p>
              <div className="crash-timer">{countdown}s</div>
              <button className="cancel-alert-button" onClick={cancelAlert}>
                Cancel Alert
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
