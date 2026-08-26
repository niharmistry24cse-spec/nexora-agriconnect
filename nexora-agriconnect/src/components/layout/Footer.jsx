import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div>
        © 2024 AgriConnect. Government Data Attribution.
      </div>
      <div className="footer-links">
        <Link to="/help">Help Center</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
      </div>
    </footer>
  );
};
