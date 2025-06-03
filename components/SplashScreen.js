import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SplashScreen.css';

function SplashScreen() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logoTimer = setTimeout(() => setStartAnimation(true), 1500);
    const textTimer = setTimeout(() => setShowText(true), 2800);
    const redirectTimer = setTimeout(() => navigate('/login'), 4500); // redirect to Login

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className={` ${startAnimation ? 'hide-shadow' : ''}`} />
      <div className="logo-wrapper">
        <img src="img/applogo.png" alt="SafeMet" className="helmet-icon" />
        {showText && (
          <div className="app-title">
            <h1>Safe Met</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default SplashScreen;
