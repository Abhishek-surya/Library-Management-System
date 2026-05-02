import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
          Lumina Library
        </Link>
        <ul className="navbar-nav">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/my-library" className="nav-link">My Library</Link></li>
          {user ? (
            <li>
              <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>
                Logout
              </button>
            </li>
          ) : (
            <li><Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Sign In</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
