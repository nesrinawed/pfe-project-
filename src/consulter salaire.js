import React, { useState, useEffect } from 'react';
import NavBar from './nav';

const Historiquesalaire = ({ employeeId }) => {
  // Initialiser le state salaryHistory avec un tableau vide
  const [salaryHistory, setSalaryHistory] = useState([]);

  useEffect(() => {
    // Dans l'effet de montage, récupérer l'historique de salaire de l'employé avec l'id employeeId depuis l'API
    // et mettre à jour le state salaryHistory avec les données récupérées
    const fetchSalaryHistory = async () => {
      const response = await fetch(`url-de-l-api/${employeeId}/salary-history`);
      const data = await response.json();
      setSalaryHistory(data);
    };
    fetchSalaryHistory();
  }, [employeeId]);

  // Regrouper les données de salaire par année
  const groupedByYear = salaryHistory.reduce((acc, salary) => {
    const year = salary.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(salary);
    return acc;
  }, {});

  return (
    // Afficher les données de salaire dans un tableau HTML
    <div>
        <NavBar/>
    <table>
      <thead>
        <tr>
          <th>Année</th>
          <th>Mois</th>
          <th>Salaire</th>
        </tr>
      </thead>
      <tbody>
        {/* Parcourir chaque année dans groupedByYear */}
        {Object.keys(groupedByYear).map((year) => (
          // Pour chaque année, afficher une première ligne avec la cellule d'année
          // et la première ligne de données de salaire, puis afficher les autres
          // lignes de données de salaire dans des lignes de tableau supplémentaires
          <React.Fragment key={year}>
            {/* La première ligne contient la cellule d'année et la première ligne de données de salaire */}
            <tr>
              <td rowSpan={groupedByYear[year].length}>{year}</td>
              <td>{groupedByYear[year][0].month}</td>
              <td>{groupedByYear[year][0].amount}</td>
            </tr>
            {/* Les lignes de tableau supplémentaires contiennent les autres lignes de données de salaire */}
            {groupedByYear[year].slice(1).map((salary) => (
              <tr key={salary.id}>
                <td>{salary.month}</td>
                <td>{salary.amount}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
    
  );
};

export default Historiquesalaire;
