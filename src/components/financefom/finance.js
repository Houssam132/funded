import React, { useState } from 'react';
import './finance.css';

const FinanceModal = ({ isOpen, onClose, formType }) => {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };
  const [isEntreprise, setIsEntreprise] = useState('no');
  if (!isOpen) return null;

  const isFunding = formType === 'funding';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {!showSuccess ? (
          <>
            <button className="close-btn right" onClick={onClose}>✕</button>
            {step > 1 && isFunding && (
              <button className="close-btn left" onClick={handleBack}>← Retour</button>
            )}
            <h2>
              {isFunding
                ? step === 1
                  ? 'Demande de financement'
                  : 'Présente ton projet'
                : 'Investir Maintenant'}
            </h2>

            <form
              className="finance-form"
              onSubmit={
                isFunding ? (step === 1 ? handleNext : handleFinalSubmit) : handleFinalSubmit
              }
            >
              {(isFunding || !isFunding) && step === 1 && (
                <>
                  <div className="form-group"><label>Nom</label><input type="text" required /></div>
                  <div className="form-group"><label>Prénom</label><input type="text" required /></div>
                  <div className="form-group"><label>Date de naissance</label><input type="date" required /></div>
                  <div className="form-group"><label>Wilaya</label><input type="text" required /></div>
                  <div className="form-group"><label>Numéro de téléphone</label><input type="tel" required /></div>
                  <div className="form-group"><label>Email</label><input type="email" required /></div>
                  <div className="form-group"><label>Carte d'identité</label><input type="file" accept=".jpg,.png,.jpeg,.pdf" required /></div>
                </>
              )}
              {!isFunding && (
                      <>
                        <div className="form-group">
                          <label>Êtes-vous une entreprise ?</label>
                          <div className="radio-group">
                            <label>
                              <input
                                type="radio"
                                name="isEntreprise"
                                value="yes"
                                checked={isEntreprise === 'yes'}
                                onChange={() => setIsEntreprise('yes')}
                              /> Oui
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="isEntreprise"
                                value="no"
                                checked={isEntreprise === 'no'}
                                onChange={() => setIsEntreprise('no')}
                              /> Non
                            </label>
                          </div>
                        </div>

                        {isEntreprise === 'yes' && (
                          <div className="form-group">
                            <label>Nom de l'entreprise</label>
                            <input type="text" required />
                          </div>
                        )}

                        <div className="form-group">
                          <label>Montant à investir (DA)</label>
                          <input type="number" required />
                        </div>

                        <div className="form-group">
                          <label>Projet ciblé (optionnel)</label>
                          <input type="text" />
                        </div>
                      </>
                    )}

              {isFunding && step === 2 && (
                <>
                  <div className="form-group"><label>Titre du projet</label><input type="text" required /></div>
                  <div className="form-group"><label>Type de projet</label><input type="text" required /></div>
                  <div className="form-group"><label>Description</label><textarea rows="5" required /></div>
                  <div className="form-group"><label>Objectifs</label><input type="text" required /></div>
                  <div className="form-group"><label>Montant nécessaire (DA)</label><input type="number" required /></div>
                  <div className="form-group"><label>Période de réalisation</label><input type="text" required /></div>
                  <div className="form-group"><label>Statut du projet</label>
                    <select required>
                      <option value="">-- Sélectionnez --</option>
                      <option value="Nouveau">Nouveau</option>
                      <option value="Existant">Existant</option>
                    </select>
                  </div>
                  <div className="form-group"><label>Fichier du projet</label><input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" required /></div>
                </>
              )}

             

              <button type="submit" className="submit-btn">
                {isFunding ? (step === 1 ? 'Continuer' : 'Soumettre') : 'Soumettre'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <h2>✅ Merci !</h2>
            <p>{isFunding ? 'Votre projet a été soumis avec succès.' : 'Votre volonté d’investir a été enregistrée.'} Nous vous contacterons bientôt.</p>
            <button className="submit-btn" onClick={onClose}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceModal;
