import React, { Component } from 'react';
import ZakatForm from './ZakatForm';
import ZakatResults from './ZakatResults';
import AssetInputs from './AssetInputs';
import { calculateZakat } from '../utils/zakatCalculations';
import '../styles/zakat.css';

class ZakatCalculator extends Component {
    state = {
        activeCategory: null, // 'money', 'business', 'agriculture', 'livestock'
        activeType: null, // For subcategories like 'cash', 'gold', etc.
        assets: {
            money: {
                cash: 0,
                gold: 0, // in grams
                silver: 0, // in grams
                bankAccounts: 0,
                cryptocurrency: 0,
            },
            business: {
                inventory: 0,
                rawMaterials: 0,
                finishedProducts: 0,
            },
            agriculture: {
                irrigationType: 'natural', // natural or artificial
                produceWeight: 0, // in kg
            },
            livestock: {
                type: 'camels', // camels, cows, sheep
                count: 0,
                grazingMethod: 'natural', // natural or manual
            }
        },
        zakatAmount: 0,
        error: '',
    };

    selectCategory = (category) => {
        this.setState({ 
            activeCategory: category,
            activeType: null,
            zakatAmount: 0,
            error: ''
        });
    };

    selectType = (type) => {
        this.setState({ activeType: type, zakatAmount: 0, error: '' });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        const { activeCategory, activeType } = this.state;
        
        if (activeCategory === 'agriculture' && name === 'irrigationType') {
            this.setState(prevState => ({
                assets: {
                    ...prevState.assets,
                    agriculture: {
                        ...prevState.assets.agriculture,
                        irrigationType: value
                    }
                }
            }));
            return;
        }

        if (activeCategory === 'livestock' && (name === 'type' || name === 'grazingMethod')) {
            this.setState(prevState => ({
                assets: {
                    ...prevState.assets,
                    livestock: {
                        ...prevState.assets.livestock,
                        [name]: value
                    }
                }
            }));
            return;
        }

        // For regular numeric inputs
        const numericValue = parseFloat(value) || 0;

        if (activeCategory && activeType) {
            // Update specific type like gold, cash
            this.setState(prevState => ({
                assets: {
                    ...prevState.assets,
                    [activeCategory]: {
                        ...prevState.assets[activeCategory],
                        [activeType]: numericValue
                    }
                }
            }));
        } else if (activeCategory === 'agriculture') {
            // Direct mapping for agriculture
            this.setState(prevState => ({
                assets: {
                    ...prevState.assets,
                    [activeCategory]: {
                        ...prevState.assets[activeCategory],
                        [name]: numericValue
                    }
                }
            }));
        } else if (activeCategory === 'livestock') {
            // Direct mapping for livestock
            this.setState(prevState => ({
                assets: {
                    ...prevState.assets,
                    livestock: {
                        ...prevState.assets.livestock,
                        [name]: name === 'count' ? numericValue : value
                    }
                }
            }));
        } else if (activeCategory === 'business') {
            // For business assets
            this.setState(prevState => ({
                assets: {
                    ...prevState.assets,
                    business: {
                        ...prevState.assets.business,
                        [name]: numericValue
                    }
                }
            }));
        }
    };

    handleCalculate = (event) => {
        event.preventDefault();
        
        const { assets, activeCategory } = this.state;
        
        try {
            const zakatResult = calculateZakat(assets, activeCategory);
            this.setState({ zakatAmount: zakatResult, error: '' });
        } catch (error) {
            this.setState({ error: error.message || 'Error calculating zakat' });
        }
    };

    resetCalculator = () => {
        this.setState({ 
            activeCategory: null,
            activeType: null,
            zakatAmount: 0,
            error: ''
        });
    };

    render() {
        const { activeCategory, activeType, assets, zakatAmount, error } = this.state;

        return (
            <div className="zakat-calculator">
                <h2>Zakat Calculator</h2>
                
                {!activeCategory && (
                    <div className="category-selector">
                        <h3>Select Asset Category</h3>
                        <div className="category-buttons">
                            <button onClick={() => this.selectCategory('money')} className="category-btn">
                                Money & Valuables
                            </button>
                            <button onClick={() => this.selectCategory('business')} className="category-btn">
                                Business Assets
                            </button>
                            <button onClick={() => this.selectCategory('agriculture')} className="category-btn">
                                Agricultural Produce
                            </button>
                            <button onClick={() => this.selectCategory('livestock')} className="category-btn">
                                Livestock
                            </button>
                        </div>
                    </div>
                )}
                
                {activeCategory && (
                    <>
                        <div className="breadcrumb">
                            <button onClick={this.resetCalculator} className="back-btn">
                                ← Back to Categories
                            </button>
                            <span>{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</span>
                            {activeType && <span> &gt; {activeType.charAt(0).toUpperCase() + activeType.slice(1)}</span>}
                        </div>
                        
                        <ZakatForm 
                            activeCategory={activeCategory}
                            activeType={activeType}
                            selectType={this.selectType}
                            assets={assets}
                            onInputChange={this.handleInputChange}
                            onCalculate={this.handleCalculate}
                        />
                        
                        {error && <p className="error">{error}</p>}
                        
                        {zakatAmount && (
                            <ZakatResults 
                                zakatAmount={zakatAmount} 
                                category={activeCategory}
                                type={activeType}
                                assets={assets}
                            />
                        )}
                    </>
                )}
                
                <AssetInputs activeCategory={activeCategory} />
            </div>
        );
    }
}

export default ZakatCalculator;