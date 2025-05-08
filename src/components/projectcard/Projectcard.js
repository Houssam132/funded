import React from 'react';
import './Projectcard.css';

const ProjectCard = ({ project, onMoreDetails }) => {
  return (
    <div className="project-card">
      <img src={project.image} alt={project.name} className="project-image" />
      <div className="project-info">
        <h3>{project.name}</h3>
        <p><strong>Domaine :</strong> {project.field}</p>
        <p><strong>Prix sponsor :</strong> {project.sponsorPrice}</p>
        <button className="details-btn" onClick={onMoreDetails}>Plus de détails</button>
      </div>
    </div>
  );
};

export default ProjectCard;
