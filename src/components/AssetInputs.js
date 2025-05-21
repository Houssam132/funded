import React from 'react';

const AssetInputs = ({ activeCategory }) => {
  // Information for each category
  const categoryInfo = {
    money: {
      title: "Zakat on Money & Valuables",
      nisab: "Value of 85 grams of gold or 595 grams of silver",
      rate: "2.5% annually",
      conditions: [
        "Assets held for a full lunar year",
        "Exceeds nisab threshold",
        "Free from debt"
      ],
      types: [
        { name: "Cash", description: "Physical currency at home or elsewhere" },
        { name: "Gold", description: "Jewelry, coins, or bullion (85g threshold)" },
        { name: "Silver", description: "Jewelry, coins, or bullion (595g threshold)" },
        { name: "Bank Accounts", description: "Savings and current accounts" },
        { name: "Cryptocurrency", description: "Bitcoin, Ethereum, etc. at market value" }
      ]
    },
    business: {
      title: "Zakat on Business Assets",
      nisab: "Same as money (85g gold value)",
      rate: "2.5% annually",
      conditions: [
        "Assets intended for trade",
        "Owned for at least one year",
        "Value exceeds nisab"
      ],
      types: [
        { name: "Inventory", description: "Goods for sale" },
        { name: "Raw Materials", description: "Materials for manufacturing" },
        { name: "Finished Products", description: "Completed goods ready for sale" }
      ]
    },
    agriculture: {
      title: "Zakat on Agricultural Produce",
      nisab: "5 wasq (approx. 653 kg)",
      rate: "10% if naturally irrigated, 5% if artificially irrigated",
      conditions: [
        "Harvested crops that can be stored",
        "Exceeds nisab threshold",
        "No requirement for passing of one year"
      ],
      examples: [
        "Wheat", "Barley", "Dates", "Grapes", "Rice"
      ]
    },
    livestock: {
      title: "Zakat on Livestock",
      conditions: [
        "Animals graze freely for most of the year",
        "Kept for breeding, not labor",
        "Owned for a full year",
        "Meet minimum number threshold"
      ],
      types: [
        { 
          name: "Camels", 
          description: "Starts at 5 camels = 1 sheep owed. Special rates apply as number increases." 
        },
        { 
          name: "Cows/Oxen", 
          description: "30 cows = 1 one-year-old calf. 40 cows = 1 two-year-old cow." 
        },
        { 
          name: "Sheep/Goats", 
          description: "40 sheep/goats = 1 sheep owed. Increases with every 100 up to 120." 
        }
      ]
    }
  };
  
  // If no category is selected, show general information
  if (!activeCategory) {
    return (
      <div className="asset-information general-info">
        <h3>Zakat Categories</h3>
        <div className="asset-info-container">
          <div className="asset-info-card">
            <h4>Money & Valuables</h4>
            <p>Cash, gold, silver, bank accounts, and other financial assets</p>
            <p><strong>Rate:</strong> 2.5% annually</p>
          </div>
          
          <div className="asset-info-card">
            <h4>Business Assets</h4>
            <p>Inventory, raw materials, and goods for trade</p>
            <p><strong>Rate:</strong> 2.5% annually</p>
          </div>
          
          <div className="asset-info-card">
            <h4>Agricultural Produce</h4>
            <p>Crops and fruits that can be stored</p>
            <p><strong>Rate:</strong> 5-10% based on irrigation method</p>
          </div>
          
          <div className="asset-info-card">
            <h4>Livestock</h4>
            <p>Camels, cows, sheep, and goats kept for breeding</p>
            <p><strong>Rate:</strong> Varies by type and number</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Show information for the selected category
  const info = categoryInfo[activeCategory];
  
  return (
    <div className="asset-information">
      <h3>{info.title}</h3>
      
      <div className="info-section">
        {info.nisab && (
          <>
            <h4>Nisab Threshold</h4>
            <p>{info.nisab}</p>
          </>
        )}
        
        {info.rate && (
          <>
            <h4>Zakat Rate</h4>
            <p>{info.rate}</p>
          </>
        )}
        
        <h4>Conditions</h4>
        <ul>
          {info.conditions.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ul>
        
        {info.types && (
          <>
            <h4>Types Included</h4>
            <div className="types-grid">
              {info.types.map((type, index) => (
                <div key={index} className="type-item">
                  <h5>{type.name}</h5>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
        
        {info.examples && (
          <>
            <h4>Examples</h4>
            <div className="examples-list">
              {info.examples.join(", ")}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssetInputs;