import React, { useState } from 'react';
import './publishproject.css';

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

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
const storage = getStorage(app);

const PublishProjectModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    sponsorPrice: '',
    financeSummary: '',
    risks: '',
    description: '',
    team: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = '';

      if (formData.image instanceof File) {
        const imageRef = ref(storage, `projectImages/${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/${encodeURIComponent(imageRef.name)}?alt=media`;
      }

      await addDoc(collection(db, 'Project'), {
        name: formData.name,
        field: formData.field,
        sponsorPrice: formData.sponsorPrice,
        FinanceSummary: formData.financeSummary,
        risks: formData.risks,
        description: formData.description,
        team: formData.team,
        image: formData.image,
      });

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
          <textarea name="financeSummary" placeholder="Résumé de l’étude financière" onChange={handleChange} required />
          <textarea name="risks" placeholder="Risques" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input name="team" type="text" placeholder="Créateur / Équipe" onChange={handleChange} required />
          <input name="image" type="file" accept="image/*" onChange={handleChange}  />

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
