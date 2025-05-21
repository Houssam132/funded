import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/hero/hero'; // Import the Hero component
import Services from './components/Services/Services'; // Import the Services component
import Goals from './components/Goals/Goals'; // Import the Goals component
import Footer from './components/Footer/Footer'; // Import the Footer component
import Adminpage from './Pages/AdminPage.js';
import ProjectsPage from './Pages/projectpage/projectpage'; // Import the ProjectsPage component
import React, { useState } from 'react';
import PublishProjectModal from './components/Projectadminform/PublishProjectModal.js'; // import it
import ZakatPage from './Pages/ZakatPage'; // Import the ZakatPage component


function HomePage() {
  return (
    <div className='App'>
      <Navbar isAdmin={false}/>
      <Hero />
      <Services />
      <Goals />
      <Footer />
    </div>
  );
}

function AdminPage() {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const handlePublishClick = () => {
    setIsPublishModalOpen(true);
};
  return (
    <div className='App'>
      <Navbar isAdmin={true} onPublishClick={handlePublishClick} />
      <Adminpage />
      <Footer />
      <PublishProjectModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/zakat" element={<ZakatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
