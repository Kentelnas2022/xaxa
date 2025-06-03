import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const LayoutNav = () => {
  const location = useLocation();

  const activeMap = {
    '/dashboard': 0,
    '/emergency': 1,
    '/profile': 2,
  };

  const activeIndex = activeMap[location.pathname] ?? 0;

  return (
    <>
      <header className="header">
        <h1 className="page-title">
          {location.pathname === '/dashboard' && 'Dashboard'}
          {location.pathname === '/emergency' && 'Emergency'}
          {location.pathname === '/profile' && 'Profile'}
        </h1>
      </header>

      <main>
        <Outlet />
      </main>

      <NavBar active={activeIndex} />
    </>
  );
};

export default LayoutNav;
