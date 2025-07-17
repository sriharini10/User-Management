import React from 'react';

export default function Sidebar({ setSection, logout }) {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li onClick={() => setSection('home')}>Home</li>
        <li onClick={() => setSection('users')}>User Management</li>
        <li onClick={() => setSection('reports')}>Reports</li>
        <li onClick={() => setSection('settings')}>Settings</li>
        <li onClick={logout}>Logout</li>
      </ul>
    </div>
  );
}
