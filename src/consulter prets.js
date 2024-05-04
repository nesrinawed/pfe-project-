import React, { useState, useEffect } from "react";
import NavBar from "./nav";

const Historiqueprets = ({ employeeId }) => {
  const [loanHistory, setLoanHistory] = useState([]);

  useEffect(() => {
    // appel à une API ou une fonction qui récupère l'historique de prêts de l'employé avec l'ID `employeeId`
    const fetchLoanHistory = async () => {
      const response = await fetch(`/api/employees/${employeeId}/loans`);
      const loanHistory = await response.json();
      setLoanHistory(loanHistory);
    };
    fetchLoanHistory();
  }, [employeeId]);

  return (
    <div>
      <NavBar/>
    <table>
      <thead>
        <tr>
          <th>Libellé</th>
          <th>Date d'opération</th>
          <th>Nombre de mois remboursés</th>
          <th>Montant crédit</th>
          <th>Nombre de mois restant</th>
          <th>Montant restant</th>
        </tr>
      </thead>
      <tbody>
        {loanHistory.map((loan) => (
          <tr key={loan.id}>
            <td>{loan.label}</td>
            <td>{loan.operationDate}</td>
            <td>{loan.repaidMonths}</td>
            <td>{loan.creditAmount}</td>
            <td>{loan.remainingMonths}</td>
            <td>{loan.remainingAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Historiqueprets;
