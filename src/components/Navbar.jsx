import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">NASA APOD</Link>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/gallery">Gallery</Link>
        </div>
      </div>
    </nav>
  );
}
