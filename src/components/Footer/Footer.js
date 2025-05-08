// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id='footer'>
      <div className="footer-logo-section">
        <div className="footer-logo-circle">T</div>
        <h3 className="footer-title">Tayseer</h3>
      </div>
      <p className="footer-description">
      "Investir selon ses valeurs, c’est bâtir un avenir éthique et durable. Rejoignez-nous et faites partie du changement"
      </p>
      <div className="footer-socials">
        <a href="fb" aria-label="Facebook" className="social-icon"><i className="fab fa-facebook-f"></i></a>
        <a href="tw" aria-label="Twitter" className="social-icon"><i className="fab fa-twitter"></i></a>
        <a href="pi" aria-label="Pinterest" className="social-icon"><i className="fab fa-pinterest-p"></i></a>
        <a href="in" aria-label="Instagram" className="social-icon"><i className="fab fa-instagram"></i></a>
        <a href="yo" aria-label="YouTube" className="social-icon"><i className="fab fa-youtube"></i></a>
      </div>
    </footer>
  );
}

export default Footer;
