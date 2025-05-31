import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: 'Home', icon: 'home', path: '/dashboard' },
    { label: 'Call', icon: 'telephone', path: '/emergency' },
    { label: 'Profile', icon: 'profile', path: '/profile' },
  ];

  return (
    <nav className="bottom-nav">
      <ul className="nav-list">
        {items.map((item, index) => (
          <li
            key={index}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <img src={`/img/${item.icon}.png`} alt={`${item.label} Icon`} />
            <span>{item.label}</span>
          </li>
        ))}
        <div
          className="nav-highlight"
          style={{ left: `calc(${items.findIndex(i => i.path === location.pathname) * 33.33}% + 16.66% - 30px)` }}
        ></div>
      </ul>
    </nav>
  );
};

export default NavBar;