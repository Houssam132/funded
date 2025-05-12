import React, { useState } from 'react';
import './projectdetail.css';
import FinanceModal from '../financefom/finance';

const ProjectDetailsModal = ({ project, onClose, onInvest }) => {
  const [isFinanceModalOpen, setFinanceModalOpen] = useState(false);

  if (!project) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>{project.name}</h2>
        <p><strong>Domaine :</strong> {project.field}</p>
        <p><strong>Prix sponsor :</strong> {project.sponsorPrice}</p>
        <p><strong>Créateur :</strong> {project.team}</p>
        <p><strong>Résumé de l'étude financière :</strong> {project.financeSummary}</p>
        <p><strong>Risques :</strong> {project.risks}</p>
        <p><strong>Description :</strong> {project.description}</p>

        <button className="invest-btn" onClick={() => setFinanceModalOpen(true)}>
          Investir maintenant
        </button>
      </div>

      <FinanceModal
        isOpen={isFinanceModalOpen}
        onClose={() => setFinanceModalOpen(false)}
        formType="investment"
        selectedProject={{
        projectTitle: project.name,    // Pass the project title
        projectCreator: project.team // Pass the project creator
  }}
      />
    </div>
  );
};

export default ProjectDetailsModal;
