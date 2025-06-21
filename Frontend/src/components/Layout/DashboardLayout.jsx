import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './DashboardLayout.css'; // Add styles separately
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  const navigate = useNavigate();

  

  return (
    <div className="dashboard-container">
      <Header/>

      <aside className="dashboard-sidebar">
        <Sidebar/>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
