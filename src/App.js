import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username'));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!username ? <Login setUsername={setUsername} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard username={username} setUsername={setUsername} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
