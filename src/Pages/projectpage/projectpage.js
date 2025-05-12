import React, { useState, useEffect } from 'react';
import ProjectCard from '../../components/projectcard/Projectcard';
import ProjectDetailsModal from '../../components/projectdetail/projectdetail';
import './projectpage.css';
import { db } from '../../firebaseconf'
import { collection, getDocs } from 'firebase/firestore';
const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch projects from Firestore
useEffect(() => {
  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Project'));
      const fetchedProjects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Fetched projects:", fetchedProjects); // ✅ See the result
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error); // ❌ Will show error if broken
    }
  };

  fetchProjects();
}, []);


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
