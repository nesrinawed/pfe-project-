import React, { useState, useEffect } from "react";
import NavBar from "./nav";
import axios from "axios";

function Validerautorisation() {
  const [demandes, setDemandes] = useState([]);


  

  //get all autorisation  :
   useEffect(() => {
    const fetchconge = async () => {
      const response = await axios.get("http://localhost:6060/autorisation");
      setDemandes(response.data);
    };
    fetchconge();
  });

  //valider Autorisation  :
  const ValiderAut = async (id) => {
    try {
      const response = axios.put(
        `http://localhost:6060/autorisation/validerAut/${id}`
      );
      alert("Autorisation  validé");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="autorisations-page">
      <NavBar />
      <h1>Liste des demandes d'autorisations</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>email</th>
            <th>Jour</th>
            <th>Heure de sortie</th>
            <th>Heure de retour</th>
            <th>etat</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {demandes
            .filter((e) => {
              return (
                e.etatAutorisation == "accepte" ||
                e.etatAutorisation == "valide"
              );
            })
            .map((demande) => (
              <tr key={demande.idAutorisation}>
                <td>{demande.username}</td>
                <td>{demande.email}</td>
                <td>{demande.jourAutorisation}</td>
                <td>{demande.heureSortie}</td>
                <td>{demande.heureEntre}</td>
                <td>{demande.etatAutorisation}</td>

                <td>
                  <button
                    onClick={() => {
                      if (demande.etatAutorisation == "valide") {
                        alert("autorisation deja valide");
                      } else {
                        ValiderAut(demande.idAutorisation);
                      }
                    }}
                  >
                    Valider
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Validerautorisation;
