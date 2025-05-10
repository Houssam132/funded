import React, { useState } from 'react';
import './publishproject.css';

const PublishProjectModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    sponsorPrice: '',
    financeSummary: '',
    risks: '',
    description: '',
    team: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Projet publié :", formData);
    // Here you can call an API to publish the project
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2 className='pub'>Publier un projet</h2>
        <form onSubmit={handleSubmit} className="publish-form">
          <input name="name" type="text" placeholder="Nom du projet" onChange={handleChange} required />
          <input name="field" type="text" placeholder="Domaine" onChange={handleChange} required />
          <input name="sponsorPrice" type="number" placeholder="Prix sponsor (DA)" onChange={handleChange} required />
          <textarea name="financeSummary" placeholder="Résumé de l’étude financière" onChange={handleChange} required />
          <textarea name="risks" placeholder="Risques" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input name="team" type="text" placeholder="Créateur / Équipe" onChange={handleChange} required />
          <button type="submit" className="submit-btn">Publier</button>
        </form>
      </div>
    </div>
  );
};

export default PublishProjectModal;
