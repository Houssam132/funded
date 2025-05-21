// Nisab thresholds and current prices
const NISAB_GOLD_GRAMS = 85;
const NISAB_SILVER_GRAMS = 595;
const GOLD_PRICE_PER_GRAM = 60; // Example price in USD
const SILVER_PRICE_PER_GRAM = 0.8; // Example price in USD
const NISAB_VALUE = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM; // Using gold as the default nisab

// Agricultural nisab in kg
const AGRICULTURAL_NISAB_KG = 653; // Approx. 5 wasq

// Calculate zakat on money (cash, bank accounts, cryptocurrency)
export const calculateZakatMoney = (amount) => {
  if (amount >= NISAB_VALUE) {
    const zakatAmount = amount * 0.025; // 2.5% of wealth
    return {
      amount: zakatAmount,
      description: `$${zakatAmount.toFixed(2)} (2.5% of your total wealth)`
    };
  }
  return { amount: 0, description: "No Zakat due (below Nisab threshold)" };
};

// Calculate zakat on gold
export const calculateZakatGold = (goldGrams) => {
  if (goldGrams >= NISAB_GOLD_GRAMS) {
    const zakatAmount = goldGrams * GOLD_PRICE_PER_GRAM * 0.025;
    const zakatGrams = goldGrams * 0.025; // 2.5% of gold weight
    return {
      amount: zakatAmount,
      description: `${zakatGrams.toFixed(2)} grams of gold (2.5% of your gold), valued at $${zakatAmount.toFixed(2)}`
    };
  }
  return { amount: 0, description: "No Zakat due (below Nisab threshold of 85 grams)" };
};

// Calculate zakat on silver
export const calculateZakatSilver = (silverGrams) => {
  if (silverGrams >= NISAB_SILVER_GRAMS) {
    const zakatAmount = silverGrams * SILVER_PRICE_PER_GRAM * 0.025;
    const zakatGrams = silverGrams * 0.025; // 2.5% of silver weight
    return {
      amount: zakatAmount,
      description: `${zakatGrams.toFixed(2)} grams of silver (2.5% of your silver), valued at $${zakatAmount.toFixed(2)}`
    };
  }
  return { amount: 0, description: "No Zakat due (below Nisab threshold of 595 grams)" };
};

// Calculate zakat on business assets
export const calculateZakatBusiness = (assets) => {
  const totalValue = assets.inventory + assets.rawMaterials + assets.finishedProducts;
  
  if (totalValue >= NISAB_VALUE) {
    const zakatAmount = totalValue * 0.025;
    return {
      amount: zakatAmount,
      description: `$${zakatAmount.toFixed(2)} (2.5% of your business assets)`
    };
  }
  return { amount: 0, description: "No Zakat due (below Nisab threshold)" };
};

// Calculate zakat on agricultural produce
export const calculateZakatAgriculture = (assets) => {
  const { produceWeight, irrigationType } = assets;
  
  if (produceWeight < AGRICULTURAL_NISAB_KG) {
    return { amount: 0, description: "No Zakat due (below Nisab threshold of 653 kg)" };
  }
  
  // Assuming average price of produce at $2 per kg for calculation
  const produceValue = produceWeight * 2;
  
  // Rate is 10% for natural irrigation, 5% for artificial
  const rate = irrigationType === 'natural' ? 0.1 : 0.05;
  const zakatAmount = produceValue * rate;
  const zakatWeight = produceWeight * rate;
  const rateText = irrigationType === 'natural' ? "10%" : "5%";
  
  return {
    amount: zakatAmount,
    description: `${zakatWeight.toFixed(2)} kg of produce (${rateText} of your harvest), valued at $${zakatAmount.toFixed(2)}`
  };
};

// Calculate zakat on camels
export const calculateZakatCamels = (count, grazingMethod) => {
  // Only apply if naturally grazed
  if (grazingMethod !== 'natural') {
    return { amount: 0, description: "No Zakat due (not naturally grazed)" };
  }
  
  if (count < 5) {
    return { amount: 0, description: "No Zakat due (below minimum threshold of 5 camels)" };
  }
  
  // Simplified calculation based on number ranges with descriptive text
  if (count >= 5 && count <= 9) {
    return { amount: 150, description: "1 sheep" };
  } else if (count >= 10 && count <= 14) {
    return { amount: 300, description: "2 sheep" };
  } else if (count >= 15 && count <= 19) {
    return { amount: 450, description: "3 sheep" };
  } else if (count >= 20 && count <= 24) {
    return { amount: 600, description: "4 sheep" };
  } else if (count >= 25 && count <= 35) {
    return { amount: 800, description: "1 young female camel (bint makhad)" };
  } else if (count >= 36 && count <= 45) {
    return { amount: 1200, description: "1 two-year-old female camel (bint labun)" };
  } else if (count >= 46 && count <= 60) {
    return { amount: 1500, description: "1 three-year-old female camel (hiqqa)" };
  } else if (count >= 61 && count <= 75) {
    return { amount: 1800, description: "1 four-year-old female camel (jadha'a)" };
  } else if (count >= 76 && count <= 90) {
    return { amount: 2400, description: "2 two-year-old female camels (bint labun)" };
  } else if (count >= 91 && count <= 120) {
    return { amount: 3000, description: "2 three-year-old female camels (hiqqa)" };
  } else {
    // Simplified for larger numbers
    const zakatAmount = count * 0.025 * 1000;
    return { 
      amount: zakatAmount, 
      description: `Approx. ${Math.ceil(count * 0.025)} camels (contact a scholar for specific distribution)` 
    };
  }
};

// Calculate zakat on cows
export const calculateZakatCows = (count, grazingMethod) => {
  // Only apply if naturally grazed
  if (grazingMethod !== 'natural') {
    return { amount: 0, description: "No Zakat due (not naturally grazed)" };
  }
  
  if (count < 30) {
    return { amount: 0, description: "No Zakat due (below minimum threshold of 30 cows)" };
  }
  
  if (count >= 30 && count < 40) {
    return { amount: 500, description: "1 one-year-old male calf (tabi')" };
  } else if (count >= 40 && count < 60) {
    return { amount: 800, description: "1 two-year-old female cow (musinna)" };
  } else if (count >= 60 && count < 70) {
    return { amount: 1000, description: "2 one-year-old male calves (tabi')" };
  } else if (count >= 70 && count < 80) {
    return { amount: 1300, description: "1 one-year-old male calf and 1 two-year-old female cow" };
  } else if (count >= 80 && count < 90) {
    return { amount: 1600, description: "2 two-year-old female cows (musinna)" };
  } else if (count >= 90 && count < 100) {
    return { amount: 1500, description: "3 one-year-old male calves (tabi')" };
  } else if (count >= 100 && count < 120) {
    return { amount: 1800, description: "1 two-year-old female cow and 2 one-year-old calves" };
  } else {
    // Simplified for larger numbers
    const zakatAmount = count * 0.025 * 800;
    return { 
      amount: zakatAmount, 
      description: `For each 30: a one-year-old calf; for each 40: a two-year-old cow (contact a scholar for specific distribution)` 
    };
  }
};

// Calculate zakat on sheep/goats
export const calculateZakatSheep = (count, grazingMethod) => {
  // Only apply if naturally grazed
  if (grazingMethod !== 'natural') {
    return { amount: 0, description: "No Zakat due (not naturally grazed)" };
  }
  
  if (count < 40) {
    return { amount: 0, description: "No Zakat due (below minimum threshold of 40 sheep/goats)" };
  }
  
  if (count >= 40 && count < 121) {
    return { amount: 150, description: "1 sheep" };
  } else if (count >= 121 && count < 201) {
    return { amount: 300, description: "2 sheep" };
  } else if (count >= 201 && count < 400) {
    return { amount: 450, description: "3 sheep" };
  } else if (count >= 400 && count < 500) {
    return { amount: 600, description: "4 sheep" };
  } else {
    // For every 100 more, add 1 sheep
    const sheepCount = Math.floor(count / 100);
    return { 
      amount: sheepCount * 150, 
      description: `${sheepCount} sheep (1 sheep for every 100)`
    };
  }
};

// Calculate zakat on livestock based on type
export const calculateZakatLivestock = (assets) => {
  const { type, count, grazingMethod } = assets;
  
  switch (type) {
    case 'camels':
      return calculateZakatCamels(count, grazingMethod);
    case 'cows':
      return calculateZakatCows(count, grazingMethod);
    case 'sheep':
      return calculateZakatSheep(count, grazingMethod);
    default:
      return { amount: 0, description: "Invalid livestock type" };
  }
};

// Main calculation function that routes to the appropriate calculator
export const calculateZakat = (assets, category) => {
  switch (category) {
    case 'money':
      // For money category, we need to check which type was selected
      for (const type in assets.money) {
        if (assets.money[type] > 0) {
          if (type === 'gold') return calculateZakatGold(assets.money.gold);
          if (type === 'silver') return calculateZakatSilver(assets.money.silver);
          // For cash, bank accounts, and cryptocurrency, use money calculator
          return calculateZakatMoney(assets.money[type]);
        }
      }
      return { amount: 0, description: "No assets entered" };
      
    case 'business':
      return calculateZakatBusiness(assets.business);
      
    case 'agriculture':
      return calculateZakatAgriculture(assets.agriculture);
      
    case 'livestock':
      return calculateZakatLivestock(assets.livestock);
      
    default:
      throw new Error('Invalid category');
  }
};