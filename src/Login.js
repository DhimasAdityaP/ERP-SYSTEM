import React, { useState } from 'react';
import './Login.css'; // En

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: '10px' }}>
        <p><strong>Demo Credentials:</strong></p>
        <p>Admin: admin@example.com / adminpassword</p>
        <p>User: sales@example.com / password</p>
      </div>
    </div>
  );
}

export default Login;
