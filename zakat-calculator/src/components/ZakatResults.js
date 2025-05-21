import React from 'react';

const ZakatResults = ({ calculatedZakat }) => {
    return (
        <div className="zakat-results">
            <h2>Zakat Calculation Results</h2>
            <p>Your total Zakat due is: <strong>{calculatedZakat}</strong></p>
        </div>
    );
};

export default ZakatResults;