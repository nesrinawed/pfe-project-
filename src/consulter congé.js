import React, { useState, useEffect } from "react";
import "./exemple.css";
import axios from "axios";
import NavBar from "./nav";
function CongePage() {
  const [conges, setConges] = useState([]);
  //get all conge  :
  useEffect(() => {
    const fetchconge = async () => {
      const response = await axios.get("http://localhost:6060/conge");
      setConges(response.data);
    };
    fetchconge();
  });

  

  //accepeter conge  :
  const accepterConge = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:6060/conge/accepterConge/${id}`
      );
      alert("conge accepted");
    } catch (error) {
      console.log("med");
      console.log(error);
    }
  };
  //refuser  conge  :

  const refuserConge = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:6060/conge/refuserConge/${id}`
      );
      alert("conge refused");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="conge-page">
      <NavBar />
      <h1>Liste des demandes de congé</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>mail</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Type de congé</th>
            <th>Etat conge</th>

            <th>Raison</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {conges.map((conge) => (
            <tr key={conge.id}>
              <td>{conge.username}</td>
              <td>{conge.email}</td>
              <td>{conge.dateDebutConge}</td>
              <td>{conge.dateFinConge}</td>
              <td>{conge.typeConge}</td>
              <td>{conge.etatConge}</td>

              <td>{conge.raisonConge}</td>
              <td>
                <button
                  onClick={() => {
                    accepterConge(conge.idConge);
                  }}
                >
                  Accepter
                </button>
                <button
                  onClick={() => {
                    refuserConge(conge.idConge);
                  }}
                >
                  Refuser
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CongePage;
