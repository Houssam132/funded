import React, { useState } from 'react';

const AssetInputs = ({ onChange }) => {
    const [money, setMoney] = useState(0);
    const [gold, setGold] = useState(0);
    const [silver, setSilver] = useState(0);
    const [camels, setCamels] = useState(0);

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
        onChange({
            money: parseFloat(money),
            gold: parseFloat(gold),
            silver: parseFloat(silver),
            camels: parseFloat(camels),
        });
    };

    return (
        <div className="asset-inputs">
            <label>
                Money:
                <input
                    type="number"
                    value={money}
                    onChange={(e) => handleInputChange(e, setMoney)}
                />
            </label>
            <label>
                Gold (grams):
                <input
                    type="number"
                    value={gold}
                    onChange={(e) => handleInputChange(e, setGold)}
                />
            </label>
            <label>
                Silver (grams):
                <input
                    type="number"
                    value={silver}
                    onChange={(e) => handleInputChange(e, setSilver)}
                />
            </label>
            <label>
                Camels:
                <input
                    type="number"
                    value={camels}
                    onChange={(e) => handleInputChange(e, setCamels)}
                />
            </label>
        </div>
    );
};

export default AssetInputs;