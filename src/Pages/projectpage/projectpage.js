import React, { useState, useEffect } from 'react';
import ProjectCard from '../../components/projectcard/Projectcard';
import ProjectDetailsModal from '../../components/projectdetail/projectdetail';
import './projectpage.css';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC-vKa2rJkmdc8R8w4NpIKRYr6KKaoPrFk",
  authDomain: "sharetemp-ad298.firebaseapp.com",
  projectId: "sharetemp-ad298",
  storageBucket: "sharetemp-ad298.firebasestorage.app",
  messagingSenderId: "1069248707246",
  appId: "1:1069248707246:web:e8234d9b7508ff4a4fcb3f",
  measurementId: "G-2FM7YBVRER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase initialized");
console.log("db", db);

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
