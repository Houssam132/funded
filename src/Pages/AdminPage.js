import React from 'react';
import Services from '../components/Services/Services';
import Hero from '../components/hero/hero'
import Goals from '../components/Goals/Goals'


const Adminpage = () => {
  return (
    <div className="App">
        
        <Hero />
        <Services />
        <Goals />
        
    </div>
  );
};

export default Adminpage;
