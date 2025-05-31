import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';

// Initialize Supabase client
const supabaseUrl = 'https://saigagigwcenxuwsqoir.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhaWdhZ2lnd2Nlbnh1d3Nxb2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTUzNDMsImV4cCI6MjA2MzM5MTM0M30.tSycjBx7fJKFd4boZRKghKr2LU-ToWa5Z_4IUa2VHJY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    // 1. Sign up user with Supabase Auth (this securely handles password hashing)
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setErrorMsg(signUpError.message);
      setLoading(false);
      return;
    }

    // 2. Insert user info into your 'users' table without storing password
    const { user } = signUpData;
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ id: user.id, full_name: fullName, email }]);

    if (insertError) {
      setErrorMsg(insertError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    alert('Signup successful! Please check your email to confirm your account.');
    navigate('/'); // Redirect to login or home page
  };

  return (
    <div className="container center">
      <Logo title="SafeMet" />
      <form onSubmit={handleSignup}>
        <InputField
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
        <Button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </Button>
      </form>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <div className="link">
        Already have an account? <Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default Signup;