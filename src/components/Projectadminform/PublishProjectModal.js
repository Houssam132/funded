import React, { useState } from 'react';
import './publishproject.css';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-vKa2rJkmdc8R8w4NpIKRYr6KKaoPrFk",
  authDomain: "sharetemp-ad298.firebaseapp.com",
  projectId: "sharetemp-ad298",
  storageBucket: "sharetemp-ad298.appspot.com",
  messagingSenderId: "1069248707246",
  appId: "1:1069248707246:web:e8234d9b7508ff4a4fcb3f",
  measurementId: "G-2FM7YBVRER"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
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
    image: null, // Will store base64 encoded string
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result // This will be the base64 string
        }));
      };
      
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare the data to be saved
      const projectData = {
        name: formData.name,
        field: formData.field,
        sponsorPrice: formData.sponsorPrice,
        FinanceSummary: formData.financeSummary,
        risks: formData.risks,
        description: formData.description,
        team: formData.team,
        createdAt: new Date().toISOString(),
      };

      // Only add image if it exists
      if (formData.image) {
        projectData.image = formData.image;
      }

      await addDoc(collection(db, 'Project'), projectData);

      alert('Projet publié avec succès !');
      onClose();
    } catch (err) {
      console.error('Erreur lors de la publication du projet :', err);
      setError('Erreur lors de la publication du projet.');
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
          <textarea name="financeSummary" placeholder="Résumé de l'étude financière" onChange={handleChange} required />
          <textarea name="risks" placeholder="Risques" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input name="team" type="text" placeholder="Créateur / Équipe" onChange={handleChange} required />
          <input name="image" type="file" accept="image/*" onChange={handleChange} />
          
          {/* Preview of selected image */}
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
            </div>
          )}

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