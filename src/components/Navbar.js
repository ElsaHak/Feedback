import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Product Feedback
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
