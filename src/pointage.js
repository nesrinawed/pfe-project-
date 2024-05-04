import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './exemple.css'
import NavBar from './nav';
const PointageTable = () => {
  // Déclaration d'un state pour stocker les données de pointage
  const [pointages, setPointages] = useState([]);

  // Fonction pour récupérer les données de pointage depuis l'API
  const fetchPointages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pointages');
      setPointages(response.data);
    } catch (error) {
    }
  };

  // Utilisation de useEffect pour appeler fetchPointages au montage du composant
  useEffect(() => {
    fetchPointages();
  }, []);

  return (
    <div>
        <NavBar/>
     <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Heure d'entrée matin</th>
          <th>Heure de sortie matin</th>
          <th>Heure d'entrée après-midi</th>
          <th>Heure de sortie après-midi</th>
        </tr>
      </thead>
      <tbody>
        {pointages.map((pointage) => (
          <tr key={pointage.id}>
            <td>{pointage.date}</td>
            <td>{pointage.heure_entree_matin}</td>
            <td>{pointage.heure_sortie_matin}</td>
            <td>{pointage.heure_entree_apres_midi}</td>
            <td>{pointage.heure_sortie_apres_midi}</td>
          </tr>
        ))}
      </tbody>
     </table>
    </div>
  );
};

export default PointageTable;
