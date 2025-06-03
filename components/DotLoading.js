import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/DotLoading.css'; 

const DotLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/responder');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="dot-loader">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
      <p>Please standby, we are currently requesting for help</p>
    </div>
  );
};

export default DotLoading;
