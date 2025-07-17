import React, { useEffect, useState } from 'react';
import './style.css'; // Make sure your styles are defined here

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', status: 'Active' });
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(1);

  // Load users from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('users');
    if (saved) setUsers(JSON.parse(saved));
  }, []);

  // Save users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const next = () => {
    if (step === 1 && !form.name.trim()) return alert('Enter name');

    if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) return alert('Enter a valid email');
      if (users.find(u => u.email === form.email)) return alert('Email already exists');
    }

    if (step === 3 && !/^\d{10}$/.test(form.phone)) {
      return alert('Phone must be 10 digits');
    }

    setStep(step + 1);
  };

  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!form.status) return alert('Select status');
    const newUser = { ...form, id: Date.now() };
    setUsers([...users, newUser]);
    setForm({ name: '', email: '', phone: '', status: 'Active' });
    setStep(1);
    setShowPopup(false);
  };

  const toggleStatus = (id) => {
    const updated = users.map(user =>
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    );
    setUsers(updated);
  };

  const deleteUser = (id) => {
    if (window.confirm('Delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <button onClick={() => setShowPopup(true)} className="add-user-btn">+ Create User</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3>Create User</h3>
            {step === 1 && (
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
            )}
            {step === 2 && (
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            )}
            {step === 3 && (
              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />
            )}
            {step === 4 && (
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            )}
            <div className="popup-buttons">
              {step > 1 && <button onClick={prev}>Back</button>}
              {step < 4 && <button onClick={next}>Next</button>}
              {step === 4 && <button onClick={handleSubmit}>Submit</button>}
              <button onClick={() => { setShowPopup(false); setStep(1); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <table className="user-table">
        <thead>
          <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id}>
              <td>{idx + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={user.status === 'Active'}
                    onChange={() => toggleStatus(user.id)}
                  />
                  <span className="slider"></span>
                </label>
              </td>
              <td>
                <button onClick={() => deleteUser(user.id)} className="del-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
