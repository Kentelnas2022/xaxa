// src/components/ProtectedRoute.js
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://saigagigwcenxuwsqoir.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhaWdhZ2lnd2Nlbnh1d3Nxb2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTUzNDMsImV4cCI6MjA2MzM5MTM0M30.tSycjBx7fJKFd4boZRKghKr2LU-ToWa5Z_4IUa2VHJY' // Replace with your key
);

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) return null; // Or a loading spinner

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;