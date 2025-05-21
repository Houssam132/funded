import React, { useState } from 'react';
import AssetInputs from './AssetInputs';

const ZakatForm = ({ onCalculate }) => {
    const [assets, setAssets] = useState({
        money: '',
        gold: '',
        silver: '',
        camels: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssets({
            ...assets,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCalculate(assets);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Calculate Your Zakat</h2>
            <AssetInputs assets={assets} onChange={handleChange} />
            <button type="submit">Calculate Zakat</button>
        </form>
    );
};

export default ZakatForm;