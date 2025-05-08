import React, { useState } from 'react';
import ProjectCard from '../../components/projectcard/Projectcard';
import ProjectDetailsModal from '../../components/projectdetail/projectdetail';
import './projectpage.css';
import im1 from '../../assets/im1.jpg'
import im2 from '../../assets/im1.jpg'
import im3 from '../../assets/im1.jpg'
const projects = [
  {
    id: 1,
    name: 'Smart Irrigation',
    field: 'Agriculture',
    sponsorPrice: '500,000 DA',
    image: im1,
    description: 'Un système intelligent d\'irrigation utilisant des capteurs pour économiser l\'eau.',
    team: 'Ahmed Benali et son équipe',
    financeSummary: 'Rentabilité estimée en 2 ans avec un retour progressif.',
    risks: 'Pannes techniques des capteurs et dépendance aux conditions météo.',
    documents: ['business-plan-irrigation.pdf'],
  },
  {
    id: 2,
    name: 'E-commerce Local',
    field: 'Technologie',
    sponsorPrice: '800,000 DA',
    image: im2,
    description: 'Une plateforme en ligne pour connecter vendeurs locaux et clients nationaux.',
    team: 'SARL ElAmel',
    financeSummary: 'Prévision de bénéfice net de 20% la première année.',
    risks: 'Concurrence accrue, dépendance aux services de livraison.',
    documents: ['etude-marche-ecommerce.pdf'],
  },
  {
    id: 3,
    name: 'Recyclage Plastique',
    field: 'Environnement',
    sponsorPrice: '600,000 DA',
    image: im3,
    description: 'Projet de collecte et transformation des déchets plastiques en objets utiles.',
    team: 'Nadia Toumi',
    financeSummary: 'ROI attendu en 18 mois avec une forte demande locale.',
    risks: 'Variabilité des prix de revente, logistique de collecte.',
    documents: ['plan-recyclage.pdf'],
  },
];

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="projects-page">
      <h1 className="page-title">Explore the projects that will lead you to success achievements</h1>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onMoreDetails={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
