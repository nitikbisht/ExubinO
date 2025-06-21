import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import API from '../../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', { email, password });
      
      login(res.data.token ); // Assuming login function is available in AuthContext
      navigate('/courses');
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>👋 Welcome Back</h2>
        {error && <div className="login-error">{error}</div>}

        <label>Email</label>
        <input
          type="email" placeholder="you@example.com"
          value={email} onChange={(e) => setEmail(e.target.value)} required
        />

        <label>Password</label>
        <input
          type="password" placeholder="••••••••"
          value={password} onChange={(e) => setPassword(e.target.value)} required
        />

        <button type="submit" className="login-button">Log In</button>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
