import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import API from '../../api';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, password } = formData;

  if (name && email && password) {
    try {
      const res = await API.post('/api/auth/register', { name, email, password });
      console.log(res.data);
      navigate('/login'); // Redirect after success
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  } else {
    setError('Please fill out all fields.');
  }
};


  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <div className="signup-error">{error}</div>}

        <label>Name</label>
        <input
          type="text" name="name" placeholder="John Doe"
          value={formData.name} onChange={handleChange} required
        />

        <label>Email</label>
        <input
          type="email" name="email" placeholder="you@example.com"
          value={formData.email} onChange={handleChange} required
        />

        <label>Password</label>
        <input
          type="password" name="password" placeholder="••••••••"
          value={formData.password} onChange={handleChange} required
        />

        <button type="submit" className="signup-button">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
