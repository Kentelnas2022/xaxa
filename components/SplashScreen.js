import React, { useEffect, useState } from 'react';
import './css/SplashScreen.css';

function SplashScreen() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setStartAnimation(true);
    }, 1500);

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2800);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div className="splash-container">
      <div className={` ${startAnimation ? 'hide-shadow' : ''}`} />
      <div className="logo-wrapper">
  <img src="img/applogo.png" alt="SafeMet" className="helmet-icon" />

        {showText && (
          <div className="app-title" >
            <h1>Safe Met</h1>
            </div>
        )}
      </div>
    </div>
  );
}

export default SplashScreen;