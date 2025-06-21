import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ExamPage from './components/Exam/ExamPage';
import Score from './components/Result/Score';
import PrivateRoute from './components/Layout/PrivateRoute';
import DashboardLayout from './components/Layout/DashboardLayout';
import Courses from './components/Exam/Courses';
import { AuthProvider } from './components/context/AuthContext';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected layout with nested routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="courses" element={<Courses />} />
            <Route path="exam/:courseId" element={<ExamPage />} />
            <Route path="result" element={<Score />} />
          </Route>
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
