import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const highlightNav = (element) => {
      const navItems = document.querySelectorAll('.nav-item');
      const highlight = document.querySelector('.nav-highlight');

      navItems.forEach((item, index) => {
        item.classList.remove('active');
        if (item === element) {
          item.classList.add('active');
          highlight.style.left = `calc(${index * 33.33}% + 16.66% - 30px)`;
        }
      });
    };

    const navItems = document.querySelectorAll('.nav-item');
    const active = document.querySelector('.nav-item.active');
    if (active) highlightNav(active);

    navItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        highlightNav(item);
        // Navigation logic
        if (index === 1) {
          navigate('/emergency');
        } else if (index === 2) {
          navigate('/profile');
        }
      });
    });

    return () => {
      navItems.forEach((item, index) => {
        item.removeEventListener('click', () => {
          if (index === 1) {
            navigate('/emergency');
          } else if (index === 2) {
            navigate('/profile');
          }
        });
      });
    };
  }, [navigate]);

  return (
    <div>

  <div className="header-status-card">
          <h2 className='text-section'>Dashboard</h2>
        </div>
      <main className="main-content">
        <div className="helmet-status-card">
          <h2>Rider Status:</h2>
          <i className="fas fa-hard-hat helmet-icon"></i>
          <p className="status-text">Safe condition</p>
        </div>

        <div className="button-card">
         <button className="nav-button" onClick={() => navigate('/location')}>
  <i className="fas fa-map-marker-alt"></i>
  Helmet Tracker
  <i className="fas fa-chevron-right right-icon"></i>
</button>

          <button className="nav-button">
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
    </div>
  );
};

export default Dashboard;