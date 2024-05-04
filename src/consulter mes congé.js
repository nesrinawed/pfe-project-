import React, { useState, useEffect } from "react";
import "./exemple.css";
import NavBar from "./nav";
import axios from "axios";

function ConsulterAbs() {
  const [absences, setAbsences] = useState([]);
  const personelM = JSON.parse(localStorage.getItem("personel"));
  const id = personelM.idPersonle;
  console.log({ id });

  useEffect(() => {
    axios
      .get(`http://localhost:6060/conge/getCongePersonel/${id}`)
      .then((response) => {
        console.log(response.data);
        setAbsences(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date d'absence</th>
            <th>date de fin</th>
            <th>Type d'absence</th>
            <th>etat</th>
          </tr>
        </thead>
        <tbody>
          {absences.map((absence) => (
            <tr key={absence.id}>
              <td>{absence.dateDebutConge}</td>
              <td>{absence.dateFinConge}</td>
              <td>{absence.typeConge}</td>
              <td>{absence.etatConge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsulterAbs;