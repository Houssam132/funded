import React, { useState, useEffect } from 'react';
import './hero.css'; // We'll style the Hero section here
import {heroslides} from '../../data/heroslides'


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroslides.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  const { title, subtitle, focus, description, image } = heroslides[currentSlide];
  return (
    <div className="homepage-container" id='home'>
      <div className="text-section">
        <p className="since">— SINCE 2023</p>
        <h1>{title}</h1>
        <h2><em>{subtitle}</em> {focus}</h2>
        <p className="description">{description}</p>
      </div>
      <div className="image-section">
        <img src={image} alt="Islamic investment" />
      </div>
    </div>
  );
};


export default Hero;
