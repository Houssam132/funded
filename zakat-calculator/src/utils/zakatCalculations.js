export const calculateZakatMoney = (amount) => {
    const zakatRate = 0.025; // 2.5%
    return amount * zakatRate;
};

export const calculateZakatGold = (grams) => {
    const zakatRate = 0.025; // 2.5%
    const goldValuePerGram = 60; // Example value, adjust as necessary
    const totalGoldValue = grams * goldValuePerGram;
    return totalGoldValue * zakatRate;
};

export const calculateZakatSilver = (grams) => {
    const zakatRate = 0.025; // 2.5%
    const silverValuePerGram = 0.75; // Example value, adjust as necessary
    const totalSilverValue = grams * silverValuePerGram;
    return totalSilverValue * zakatRate;
};

export const calculateZakatCamels = (numberOfCamels) => {
    const zakatRate = 0.025; // 2.5%
    const camelValue = 1000; // Example value, adjust as necessary
    const totalCamelValue = numberOfCamels * camelValue;
    return totalCamelValue * zakatRate;
};