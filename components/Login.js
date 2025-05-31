import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Logo from './Logo';
import InputField from './InputField';
import Button from './Button';

// Replace these with your actual project credentials
const supabaseUrl = 'https://saigagigwcenxuwsqoir.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhaWdhZ2lnd2Nlbnh1d3Nxb2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTUzNDMsImV4cCI6MjA2MzM5MTM0M30.tSycjBx7fJKFd4boZRKghKr2LU-ToWa5Z_4IUa2VHJY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg('');

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData?.user) {
    setErrorMsg('Invalid email or password.');
    return;
  }

  const userId = authData.user.id;

  // Check in 'users' table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (userError || !userData) {
    setErrorMsg('User authenticated, but not found in users table.');
    return;
  }

  navigate('/loading');
};


  return (
    <div className="center">
      <div className="container">
        <Logo title="SafeMet" />
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button>Login</Button>
        </form>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        <div className="link">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;