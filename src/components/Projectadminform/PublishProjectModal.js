import React, { useState } from 'react';
import './publishproject.css';

// ✅ Firebase Setup (directly here)
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-vKa2rJkmdc8R8w4NpIKRYr6KKaoPrFk",
  authDomain: "sharetemp-ad298.firebaseapp.com",
  projectId: "sharetemp-ad298",
  storageBucket: "sharetemp-ad298.firebasestorage.app",
  messagingSenderId: "1069248707246",
  appId: "1:1069248707246:web:e8234d9b7508ff4a4fcb3f",
  measurementId: "G-2FM7YBVRER"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'Project'), {
        ...formData,
        sponsorPrice: parseFloat(formData.sponsorPrice), // optional conversion
        image: '', // If you want to add image support later
        documents: [] // Empty array for now, or modify as needed
      });

      console.log("✅ Projet publié :", formData);
      setFormData({
        name: '',
        field: '',
        sponsorPrice: '',
        financeSummary: '',
        risks: '',
        description: '',
        team: '',
      });
      onClose();
    } catch (err) {
      console.error("❌ Failed to publish:", err);
      setError("Erreur lors de la publication du projet.");
    } finally {
      setLoading(false);
    }
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
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Publication...' : 'Publier'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default PublishProjectModal;
