import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserManagement from './UserManagement';
import Reports from './Reports';
import Settings from './Settings';

export default function Dashboard({ username, setUsername }) {
  const navigate = useNavigate();
  const [section, setSection] = useState('home');

  // ✅ Safely get and display the username
  const fullEmail = username || localStorage.getItem("username") || "";
  const displayName = fullEmail.includes("@") ? fullEmail.split("@")[0] : "User";

  // ✅ Logout function
  const logout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('username');
      setUsername(null);
      navigate('/');
    }
  };

  return (
    <div className="dashboard">
      <Sidebar setSection={setSection} logout={logout} />
      <div className="content">
        {section === 'home' && <h1>Welcome, {displayName}!</h1>}
        {section === 'users' && <UserManagement />}
        {section === 'reports' && <Reports />}
        {section === 'settings' && <Settings />}
      </div>
    </div>
  );
}
