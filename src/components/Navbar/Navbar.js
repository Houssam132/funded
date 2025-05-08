import React from 'react';
import './Navbar.css';
import { Link } from 'react-scroll'
function Navbar({isAdmin}) {
  return (
    <nav className="navbar" >
      <div className="logo">
        <div className="logo-circle">T</div>
        <span className="brand">Tayseer</span>
      </div>
      {isAdmin? (
        <>
        <ul className="nav-links">
          <li><a href="Accueil" className="active"><Link to='home' spy={true} smooth={true}>Accueil</Link></a></li>
          <li><a href="services"><Link to='services' spy={true} smooth={true}>Services</Link></a></li>
          <li><a href="apropos"><Link to='obj' spy={true} smooth={true}>Objectifs</Link></a></li>
          <li><a href="publier">Publier un projet</a></li>
        </ul>
        <button className="contact-btn"><Link to='#' spy={true} smooth={true}>Administrateur</Link></button>
        </>
      ) : (
        <>
      <ul className="nav-links">
        <li><a href="Accueil" className="active"><Link to='home' spy={true} smooth={true}>Accueil</Link></a></li>
        <li><a href="services"><Link to='services' spy={true} smooth={true}>Services</Link></a></li>
        <li><a href="apropos"><Link to='obj' spy={true} smooth={true}>Objectifs</Link></a></li>
      </ul>
      <button className="contact-btn"><Link to='footer' spy={true} smooth={true}>Contact</Link></button>
      
      </>
      )
    }
    </nav>
  );
}

export default Navbar;
