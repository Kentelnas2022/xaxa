import React from 'react';

const Logo = ({ title }) => (
  <div className="logo">
    <img src="/img/applogo.png" alt="SafeMet Logo" />
    <h1>{title}</h1>
  </div>
);

export default Logo;