import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import './finance.css';

const FinanceModal = ({ isOpen, onClose, formType,selectedProject  }) => {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  
  
  const formRef = useRef();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    naissance: '',
    wilaya: '',
    tel: '',
    email: '',
    idcard: '',
    titreProjet: '',
    typeProjet: '',
    description: '',
    objectifs: '',
    montantNecessaire: '',
    periode: '',
    statut: '',
    isEntreprise: 'no',
    entrepriseNom: '',
    montant: '',
    projetCible: ''
  });

  const isFunding = formType === 'funding';
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

 const handleFinalSubmit = (e) => {
  e.preventDefault();
  console.log("Form is being submitted");

  const serviceID = 'service_pvpuxbw';
  const templateID = isFunding ? 'template_snfon8r' : 'template_shnuioa';
  const userID = 'G2CruiECGl8d5lr7N';

  // Create template params based on form type and enterprise status
  const templateParams = {
    ...formData,
    // Add enterprise-specific formatting
    entrepriseDetails: formData.isEntreprise === 'yes' ? 
      `Entreprise: Oui\nNom de l'entreprise: ${formData.entrepriseNom}` : 
      'Entreprise: Non',
    idcard: formData.idcard ? formData.idcard.name : '',
    selectedProjectTitle: selectedProject?.projectTitle || 'Non spécifié',
    selectedProjectCreator: selectedProject?.projectCreator || 'Non spécifié'
  };

  emailjs.send(serviceID, templateID, templateParams, userID)
    .then(() => {
      setShowSuccess(true);
      console.log("success", templateParams);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
    });
};

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
              ref={formRef}
              className="finance-form"
              onSubmit={isFunding ? (step === 1 ? handleNext : handleFinalSubmit) : handleFinalSubmit}
            >
              {(isFunding || !isFunding) && step === 1 && (
                <div style={{ display: step === 1 ? 'block' : 'none' }}>
                  <div className="form-group">
                    <label>Nom</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Prénom</label>
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Date de naissance</label>
                    <input type="date" name="naissance" value={formData.naissance} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Wilaya</label>
                    <input type="text" name="wilaya" value={formData.wilaya} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Numéro de téléphone</label>
                    <input type="tel" name="tel" value={formData.tel} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Carte d'identité</label>
                    <input type="file" name="idcard" onChange={handleInputChange} accept=".jpg,.png,.jpeg,.pdf" required />
                  </div>
                </div>
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
                          checked={formData.isEntreprise === 'yes'}
                          onChange={handleInputChange}
                        /> Oui
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="isEntreprise"
                          value="no"
                          checked={formData.isEntreprise === 'no'}
                          onChange={handleInputChange}
                        /> Non
                      </label>
                    </div>
                  </div>

                  {formData.isEntreprise === 'yes' && (
                    <div className="form-group">
                      <label>Nom de l'entreprise</label>
                      <input type="text" name="entrepriseNom" value={formData.entrepriseNom} onChange={handleInputChange} required />
                    </div>
                  )}

                  <div className="form-group">
                    <label>Montant à investir (DA)</label>
                    <input type="number" name="montant" value={formData.montant} onChange={handleInputChange} required />
                  </div>

                  <div className="form-group">
                    <label>Projet ciblé (optionnel)</label>
                    <input type="text" name="projetCible" value={formData.projetCible} onChange={handleInputChange} />
                  </div>
                </>
              )}

              {isFunding && step === 2 && (
                <div style={{ display: step === 2 ? 'block' : 'none' }}>
                  <div className="form-group">
                    <label>Titre du projet</label>
                    <textarea name="titreProjet" value={formData.titreProjet} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Type de projet</label>
                    <input type="text" name="typeProjet" value={formData.typeProjet} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="5" required />
                  </div>
                  <div className="form-group">
                    <label>Objectifs</label>
                    <input type="text" name="objectifs" value={formData.objectifs} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Montant nécessaire (DA)</label>
                    <input type="number" name="montantNecessaire" value={formData.montantNecessaire} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Période de réalisation</label>
                    <input type="text" name="periode" value={formData.periode} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Statut du projet</label>
                    <select name="statut" value={formData.statut} onChange={handleInputChange} required>
                      <option value="">-- Sélectionnez --</option>
                      <option value="Nouveau">Nouveau</option>
                      <option value="Existant">Existant</option>
                    </select>
                  </div>
                </div>
              )}

              <button type="submit" className="submit-btn">
                {isFunding ? (step === 1 ? 'Continuer' : 'Soumettre') : 'Soumettre'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <h2>✅ Merci !</h2>
            <p>{isFunding ? "Votre projet a été soumis avec succès." : "Votre volonté d'investir a été enregistrée. Nous vous contacterons bientôt."}</p>
            <button className="submit-btn" onClick={onClose}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceModal;