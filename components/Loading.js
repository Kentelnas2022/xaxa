import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/dashboard'), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="progress-bar-background">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p>Loading... {progress}%</p>
    </div>
  );
};

export default Loading;