import React from 'react';
import './Goals.css';
import goalVideo from '../../assets/vv.mp4'; // or use an image

const goals = [
  "Encourager les investissements éthiques conformes à la finance islamique.",
  "Offrir une plateforme sécurisée pour connecter investisseurs et porteurs de projets.",
  "Promouvoir l’économie réelle à travers des projets utiles à la communauté.",
  "Garantir la transparence et l’accompagnement dans chaque investissement."
];

const Goals = () => {
  return (
    <section className="goals-section" id='obj'>
      <div className="goals-left">
        <video src={goalVideo} autoPlay loop muted playsInline />
        {/* You can replace the video with an <img src="" /> tag if needed */}
      </div>
      <div className="goals-right">
        <h2>Nos Objectifs:</h2>
        <ul>
          {goals.map((goal, index) => (
            <li key={index} className="goal-item">{goal}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Goals;
