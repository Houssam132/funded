import React, { useState } from 'react';
import './Services.css';
import { cards } from '../../data/cards';
import FinanceModal from '../financefom/finance';


function Services() {
  const [isFinanceModalOpen, setFinanceModalOpen] = useState(false);
  const [formType, setFormType] = useState('');
  

  const handleCardClick = (title) => {
    if (title === "Recherche de financement") {
      setFormType('funding');
      setFinanceModalOpen(true);
    }
  };

  return (
    <section className="services-section" id="services">
      <div className="services-header">
        <h2>Découvrez Nos Opportunités :</h2>
        <p>Votre chemin vers l’impact</p>
      </div>
      <div className="services-grid">
        {cards.map((card, index) => (
          <div className="service-card" key={index}>
            <img src={card.image} alt={card.title} className="service-image" />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {card.title === "Recherche de financement" ? (
              <button className="details-button" onClick={() => handleCardClick(card.title)}>
                Plus de détails
              </button>
            ) : (
              <a href={card.link} className="details-button">Plus de détails</a>
            )}
          </div>
        ))}
      </div>

      <FinanceModal
        isOpen={isFinanceModalOpen}
        onClose={() => setFinanceModalOpen(false)}
        formType={formType}
      />
    </section>
  );
}

export default Services;
