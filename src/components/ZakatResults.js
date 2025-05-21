import React from 'react';

const ZakatResults = ({ zakatAmount, category, type, assets }) => {
  // Helper function to get category-specific details
  const getCategoryDetails = () => {
    switch (category) {
      case 'money':
        const assetName = type === 'gold' || type === 'silver' 
          ? `${type} (${assets.money[type]} grams)` 
          : `${type} ($${assets.money[type]})`;
        return {
          title: `${type.charAt(0).toUpperCase() + type.slice(1)} Zakat`,
          description: `Based on your ${assetName}`,
          rate: '2.5% annually'
        };
        
      case 'business':
        const totalBusinessValue = assets.business.inventory + assets.business.rawMaterials + assets.business.finishedProducts;
        return {
          title: 'Business Assets Zakat',
          description: `Based on your total business assets value ($${totalBusinessValue.toFixed(2)})`,
          rate: '2.5% annually'
        };
        
      case 'agriculture':
        const irrigationType = assets.agriculture.irrigationType === 'natural' ? 'naturally' : 'artificially';
        const rate = assets.agriculture.irrigationType === 'natural' ? '10%' : '5%';
        return {
          title: 'Agricultural Produce Zakat',
          description: `Based on your ${irrigationType} irrigated produce (${assets.agriculture.produceWeight} kg)`,
          rate: rate
        };
        
      case 'livestock':
        return {
          title: `${assets.livestock.type.charAt(0).toUpperCase() + assets.livestock.type.slice(1)} Zakat`,
          description: `Based on ${assets.livestock.count} ${assets.livestock.type} with ${assets.livestock.grazingMethod} grazing`,
          rate: 'Variable rate based on count'
        };
        
      default:
        return {
          title: 'Zakat Calculation',
          description: 'Based on your assets',
          rate: 'Various rates applied'
        };
    }
  };

  const details = getCategoryDetails();

  // Check if zakatAmount is an object with description
  const isDetailedResult = typeof zakatAmount === 'object' && zakatAmount.description;
  const amountValue = isDetailedResult ? zakatAmount.amount : zakatAmount;
  const amountDescription = isDetailedResult ? zakatAmount.description : `$${amountValue.toFixed(2)}`;

  return (
    <div className="zakat-results">
      <h3>{details.title}</h3>
      <p className="results-text">{details.description}</p>
      
      <div className="zakat-due-container">
        <h4>Zakat Due:</h4>
        {amountValue > 0 ? (
          <div className="zakat-due">
            <p className="zakat-amount">{amountDescription}</p>
            {/* Only show monetary value if it's not already part of the description */}
            {isDetailedResult && !amountDescription.includes('$') && (
              <p className="zakat-amount-value">Estimated value: ${amountValue.toFixed(2)}</p>
            )}
          </div>
        ) : (
          <p className="no-zakat">{amountDescription}</p>
        )}
      </div>
      
      <div className="results-info">
        <p><strong>Rate applied:</strong> {details.rate}</p>
      </div>
      
      <div className="results-note">
        <h4>Important Notes:</h4>
        <ul>
          <li>This calculation is an estimate based on general guidelines.</li>
          <li>Zakat is due when assets are held for a full lunar year (Hawl).</li>
          <li>Consult with a qualified scholar for your specific situation.</li>
          <li>Remember to pay your Zakat with the intention of fulfilling your obligation to Allah.</li>
        </ul>
      </div>
    </div>
  );
};

export default ZakatResults;