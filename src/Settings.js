import React from 'react';

export default function Settings() {
  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div>
      <h2>Settings</h2>
      <button onClick={toggleTheme}>Toggle Dark/Light</button>
    </div>
  );
}
