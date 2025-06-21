import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function Sidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
    logout()
    navigate('/login');
  };
  return (
    <>
    <Link to="/courses">Courses</Link>
    <button onClick={handleLogout}>Logout</button> {/* This will go to bottom */}
    </>
  )
}

export default Sidebar