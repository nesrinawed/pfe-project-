import React, { useState, useEffect } from "react";
import "./exemple.css";
import NavBar from "./nav";
import axios from "axios";
import { differenceInDays } from "date-fns";

function Validerconge() {
  const [allConge, setAllConge] = useState([]);
  const [congesAValider, setCongesAValider] = useState([]);

  //get all conge  :
  useEffect(() => {
    const fetchconge = async () => {
      const response = await axios.get("http://localhost:6060/conge");
      setAllConge(response.data);
    };
    fetchconge();
  });

  //valider Conge  :
  const ValiderConge = async (id, nbreJour, idPersonel) => {
    try {
      const response = await axios.put(
        `http://localhost:6060/conge/validerConge/${id}/${nbreJour}/${idPersonel}`
      );
      alert("conge validé");
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
            <th>email</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Type de congé</th>
            <th>etat conge</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allConge
            .filter((e) => {
              return e.etatConge == "accepte" || e.etatConge == "valide";
            })
            .map((conge) => (
              <tr key={conge.idConge}>
                <td>{conge.username}</td>
                <td>{conge.email}</td>
                <td>{conge.dateDebutConge}</td>
                <td>{conge.dateFinConge}</td>
                <td>{conge.typeConge}</td>
                <td>{conge.etatConge}</td>

                <td>
                  <button
                    onClick={() => {
                      {
                        if (conge.etatConge == "valide") {
                          return alert("conge est deja valide ");
                        } else {
                          const nbreJour = differenceInDays(
                            new Date(conge.dateFinConge),
                            new Date(conge.dateDebutConge)
                          );

                          ValiderConge(
                            conge.idConge,
                            nbreJour,
                            conge.idPersonle
                          );
                        }
                      }
                    }}
                  >
                    {" "}
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

export default Validerconge;
