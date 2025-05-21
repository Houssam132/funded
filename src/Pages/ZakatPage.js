import React from 'react';
import ZakatCalculator from '../components/ZakatCalculator';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../styles/zakat.css';

const ZakatPage = () => {
  return (
    <div className="app">
      <Navbar isAdmin={false} />
      <div className="zakat-page">
        <div className="zakat-container">
          <div className="zakat-header">
            <h1>Calculate Your Zakat</h1>
            <p>Zakat is the third pillar of Islam, a mandatory charitable contribution for eligible Muslims.</p>
          </div>
          
          <ZakatCalculator />
          
          <div className="zakat-info">
            <h3>About Zakat</h3>
            <p>
              Zakat is a form of obligatory almsgiving for Muslims who meet the necessary criteria of wealth. 
              It is considered to be a personal responsibility for Muslims to ease economic hardship for others 
              and eliminate inequality.
            </p>
            <p>
              The Quran mentions, "Establish prayer and give zakat." (2:43). Zakat is typically 2.5% of a Muslim's 
              total savings and wealth above a minimum amount known as nisab, held for one lunar year.
            </p>
            <p>
              There are different categories of wealth subject to zakat, including money, business assets, 
              agricultural produce, and livestock. Each category has its own calculation method.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ZakatPage;