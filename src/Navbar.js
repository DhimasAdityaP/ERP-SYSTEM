import React from 'react';
import './Navbar.css'; // Ensure this file exists and includes the navbar styles

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">ERP System</div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
