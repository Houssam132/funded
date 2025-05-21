import React from 'react';
import ZakatCalculator from '../components/ZakatCalculator';
import '../styles/zakat.css';

const ZakatPage = () => {
    return (
        <div className="zakat-page">
            <h1>Zakat Calculator</h1>
            <ZakatCalculator />
        </div>
    );
};

export default ZakatPage;