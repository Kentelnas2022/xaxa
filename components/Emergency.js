import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';

const Emergency = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    const highlight = document.querySelector('.nav-highlight');

    // Activate the "Call" (index 1) nav item on load
    navItems.forEach((item, index) => {
      item.classList.remove('active');
      if (index === 1) {
        item.classList.add('active');
        if (highlight) {
          highlight.style.left = `calc(${index * 33.33}% + 16.66% - 30px)`; // Adjust based on nav width
        }
      }
    });

    // Handle navigation
    navItems.forEach((item, index) => {
      item.onclick = () => {
        if (index === 0) navigate('/dashboard');
        else if (index === 1) navigate('/emergency');
        else if (index === 2) navigate('/profile');
      };
    });

    return () => {
      navItems.forEach(item => item.onclick = null);
    };
  }, [navigate]);

  return (
    <div>
      <header className="header">
        <h1 className="page-title">Emergency</h1>
      </header>

      <main className="center emergency-section">
        <div className="sos-button">SOS</div>
        <p className="sos-description">
          After pressing the SOS button, we will alert the nearest hospital, police, and traffic enforcer to your current location.
        </p>
      </main>

      <nav className="bottom-nav" id="bottomNav">
        <ul className="nav-list">
          <li className="nav-item">
            <i className="fas fa-home"></i>
          </li>
          <li className="nav-item active">
            <i className="fas fa-phone"></i>
          </li>
          <li className="nav-item">
            <i className="fas fa-user"></i>
          </li>
          <div className="nav-highlight"></div>
        </ul>
      </nav>
    </div>
  );
};

export default Emergency;