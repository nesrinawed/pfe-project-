import React, { useState, useEffect } from "react";
import NavBar from "./nav";
import axios from "axios";
function AutorisationsPage() {
  const [demandes, setDemandes] = useState([]);
  //get all demandes  :
  useEffect(() => {
    const fetchconge = async () => {
      const response = await axios.get("http://localhost:6060/autorisation");
      setDemandes(response.data);
    };
    fetchconge();
  });

  //acepter Aut  :

  const accepterAut = async (id) => {
    try {
      const response = axios.put(
        `http://localhost:6060/autorisation/accepterAut/${id}`
      );
      alert("Autorisation  accepted");
    } catch (error) {
      console.log("med");
      console.log(error);
    }
  };
  //refuser Aut   :

  const refuserAu = async (id) => {
    try {
      const response = axios.put(
        `http://localhost:6060/autorisation/refuserAut/${id}`
      );
      alert("Autorisation refused");
    } catch (error) {
      console.log("med");
      console.log(error);
    }
  };

  function accepterDemande(id) {
    // envoyer une requête à l'API pour accepter la demande avec l'id donné
    console.log("Demande acceptée : ", id);
  }

  function refuserDemande(id) {
    // envoyer une requête à l'API pour refuser la demande avec l'id donné
    console.log("Demande refusée : ", id);
  }

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
            <th>etat </th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr key={demande.idAutorisation}>
              <td>{demande.username}</td>
              <td>{demande.email}</td>
              <td>{demande.jourAutorisation}</td>
              <td>{demande.heureSortie}</td>
              <td>{demande.heureEntre}</td>
              <td>{demande.etatAutorisation}</td>

              <td>
                <button onClick={() => accepterAut(demande.idAutorisation)}>
                  Accepter
                </button>
                <button onClick={() => refuserAu(demande.idAutorisation)}>
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

export default AutorisationsPage;
