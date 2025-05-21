import React from 'react';

const ZakatForm = ({ activeCategory, activeType, selectType, assets, onInputChange, onCalculate }) => {
  
  if (!activeCategory) {
    return null;
  }
  
  // Show type selection for money category
  if (activeCategory === 'money' && !activeType) {
    return (
      <div className="type-selector">
        <h3>Select Type of Money/Valuables</h3>
        <div className="type-buttons">
          <button onClick={() => selectType('cash')} className="type-btn">Cash</button>
          <button onClick={() => selectType('gold')} className="type-btn">Gold</button>
          <button onClick={() => selectType('silver')} className="type-btn">Silver</button>
          <button onClick={() => selectType('bankAccounts')} className="type-btn">Bank Accounts</button>
          <button onClick={() => selectType('cryptocurrency')} className="type-btn">Cryptocurrency</button>
        </div>
      </div>
    );
  }
  
  // Show appropriate input form based on category and type
  let formContent;
  
  if (activeCategory === 'money' && activeType) {
    // Different inputs for different money types
    let label, unit;
    switch (activeType) {
      case 'gold':
        label = 'Gold Weight';
        unit = 'grams';
        break;
      case 'silver':
        label = 'Silver Weight';
        unit = 'grams';
        break;
      case 'cash':
        label = 'Cash Amount';
        unit = '$';
        break;
      case 'bankAccounts':
        label = 'Bank Account Balance';
        unit = '$';
        break;
      case 'cryptocurrency':
        label = 'Cryptocurrency Value';
        unit = '$';
        break;
      default:
        label = 'Amount';
        unit = '$';
    }
    
    formContent = (
      <div className="form-group">
        <label htmlFor={activeType}>{label} ({unit}):</label>
        <input
          type="number"
          id={activeType}
          name={activeType}
          value={assets.money[activeType]}
          onChange={onInputChange}
          min="0"
          step="0.01"
        />
      </div>
    );
  } else if (activeCategory === 'business') {
    formContent = (
      <>
        <div className="form-group">
          <label htmlFor="inventory">Inventory Value ($):</label>
          <input
            type="number"
            id="inventory"
            name="inventory"
            value={assets.business.inventory}
            onChange={onInputChange}
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rawMaterials">Raw Materials Value ($):</label>
          <input
            type="number"
            id="rawMaterials"
            name="rawMaterials"
            value={assets.business.rawMaterials}
            onChange={onInputChange}
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="finishedProducts">Finished Products Value ($):</label>
          <input
            type="number"
            id="finishedProducts"
            name="finishedProducts"
            value={assets.business.finishedProducts}
            onChange={onInputChange}
            min="0"
            step="0.01"
          />
        </div>
      </>
    );
  } else if (activeCategory === 'agriculture') {
    formContent = (
      <>
        <div className="form-group">
          <label htmlFor="produceWeight">Harvest Amount (kg):</label>
          <input
            type="number"
            id="produceWeight"
            name="produceWeight"
            value={assets.agriculture.produceWeight}
            onChange={onInputChange}
            min="0"
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="irrigationType">Irrigation Method:</label>
          <select
            id="irrigationType"
            name="irrigationType"
            value={assets.agriculture.irrigationType}
            onChange={onInputChange}
          >
            <option value="natural">Natural (Rain, Rivers)</option>
            <option value="artificial">Artificial (Manual Irrigation)</option>
          </select>
        </div>
      </>
    );
  } else if (activeCategory === 'livestock') {
    formContent = (
      <>
        <div className="form-group">
          <label htmlFor="type">Animal Type:</label>
          <select
            id="type"
            name="type"
            value={assets.livestock.type}
            onChange={onInputChange}
          >
            <option value="camels">Camels</option>
            <option value="cows">Cows/Oxen</option>
            <option value="sheep">Sheep/Goats</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="count">Number of Animals:</label>
          <input
            type="number"
            id="count"
            name="count"
            value={assets.livestock.count}
            onChange={onInputChange}
            min="0"
            step="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="grazingMethod">Grazing Method:</label>
          <select
            id="grazingMethod"
            name="grazingMethod"
            value={assets.livestock.grazingMethod}
            onChange={onInputChange}
          >
            <option value="natural">Natural Grazing (Most of Year)</option>
            <option value="manual">Manually Fed</option>
          </select>
        </div>
      </>
    );
  }
  
  // Return the form with appropriate inputs
  return (
    <form onSubmit={onCalculate} className="zakat-form">
      {formContent}
      <button type="submit" className="calculate-button">Calculate Zakat</button>
    </form>
  );
};

export default ZakatForm;