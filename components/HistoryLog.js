import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [helmetImage, setHelmetImage] = useState(null);

  useEffect(() => {
    // Fetch image from localStorage (adjust key as needed)
    const imageData = localStorage.getItem('helmetImage');
    if (imageData) {
      setHelmetImage(imageData);
    }

    const navItems = document.querySelectorAll('.nav-item');
    const highlight = document.querySelector('.nav-highlight');

    navItems.forEach((item, index) => {
      item.classList.remove('active');
      if (index === 0) {
        item.classList.add('active');
        if (highlight) {
          highlight.style.left = `calc(${index * 33.33}% + 16.66% - 30px)`;
        }
      }

      item.onclick = () => {
        if (index === 0) navigate('/dashboard');
        else if (index === 1) navigate('/emergency');
        else if (index === 2) navigate('/profile');
      };
    });

    return () => {
      navItems.forEach((item, index) => {
        item.removeEventListener('click', () => {
          if (index === 1) navigate('/emergency');
          else if (index === 2) navigate('/profile');
        });
      });
    };
  }, [navigate]);

  return (
    <div>
      <div className="header-status-card">
        <h2 className='text-section'>History Log</h2>
      </div>

      <main className="main-content">
        <div className="helmet-status-card">
          <h3 className='gap-text'>Date<span className='gap-text'> Indicent</span><span  className='gap-text'> Location</span></h3>
         
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
