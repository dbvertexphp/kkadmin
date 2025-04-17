// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import InquiriesPage from './components/InquiriesPage';
import SettingsPage from './components/SettingsPage';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import './App.css';
import HeroImage from './components/HeroImage';
import BackgroundImage from './components/BackgroundImage';
import ProjectImage from './components/ProjectImage';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route (accessible to everyone) */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes (only accessible to authenticated users) */}
        <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
        <Route path="/inquiries" element={<PrivateRoute element={<InquiriesPage />} />} />
        <Route path="/settings" element={<PrivateRoute element={<SettingsPage />} />} />
				<Route path="/uplodHeroImg" element={<PrivateRoute element={<HeroImage />} />} />
				<Route path="/uploadBackgroundImg" element={<PrivateRoute element={<BackgroundImage />} />} />
				<Route path="/uploadProjectImg" element={<PrivateRoute element={<ProjectImage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
