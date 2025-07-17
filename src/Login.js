import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    if (!emailPattern.test(email)) {
      setMessage("❌ Invalid email format");
      return;
    }

    if (!passwordPattern.test(password)) {
      setMessage("❌ Password must have at least 8 chars, 1 uppercase, 1 number, 1 special char.");
      return;
    }

    // Success
    localStorage.setItem("username", email);
    setMessage("✅ Login successful!");
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="text"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <div className="password-box">
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i
            className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'} eye-icon`}
            onClick={() => setShowPass(!showPass)}
          ></i>
        </div>

        <button type="submit">Login</button>
        {message && <p className="login-msg">{message}</p>}
      </form>
    </div>
  );
}
