import React, { Component } from 'react';
import ZakatForm from './ZakatForm';
import ZakatResults from './ZakatResults';
import AssetInputs from './AssetInputs';
import { calculateZakat } from '../utils/zakatCalculations';

class ZakatCalculator extends Component {
    state = {
        assets: {
            money: 0,
            gold: 0,
            silver: 0,
            camels: 0,
        },
        zakatAmount: 0,
        error: '',
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            assets: {
                ...prevState.assets,
                [name]: parseFloat(value) || 0,
            },
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { assets } = this.state;
        const zakatAmount = calculateZakat(assets);
        if (isNaN(zakatAmount)) {
            this.setState({ error: 'Invalid input values' });
        } else {
            this.setState({ zakatAmount, error: '' });
        }
    };

    render() {
        const { assets, zakatAmount, error } = this.state;

        return (
            <div className="zakat-calculator">
                <h2>Zakat Calculator</h2>
                <ZakatForm 
                    assets={assets} 
                    onInputChange={this.handleInputChange} 
                    onSubmit={this.handleSubmit} 
                />
                {error && <p className="error">{error}</p>}
                <ZakatResults zakatAmount={zakatAmount} />
                <AssetInputs assets={assets} onInputChange={this.handleInputChange} />
            </div>
        );
    }
}

export default ZakatCalculator;