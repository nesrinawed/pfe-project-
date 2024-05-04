import axios from "axios";
import React, { useState } from "react";
import NavBar from "./nav";

function DeposerAut() {
  const [heureSortie, setHeureSortie] = useState("");
  const [heureRetour, setHeureRetour] = useState("");
  const [date, setDate] = useState("");

  //get idpersonel from the localstorage   :
  const personelM = JSON.parse(localStorage.getItem("personel"));

  const DeposerAut = async (idPersonel) => {
    const body = { heureRetour, heureSortie, date };
    try {
      const res = await axios.post(
        `http://localhost:6060/autorisation/${idPersonel}`,
        body
      );
      alert("autorisation en attente");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        DeposerAut(personelM.idPersonle);
      }}
    >
      <NavBar />
      <h1>demande d'autorisation</h1>
      <label>
        Jour de la demande :
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <label>
        Heure de sortie :
        <input
          type="time"
          value={heureSortie}
          onChange={(event) => setHeureSortie(event.target.value)}
        />
      </label>
      <label>
        Heure de retour :
        <input
          type="time"
          value={heureRetour}
          onChange={(event) => setHeureRetour(event.target.value)}
        />
      </label>

      <button type="submit">Envoyer la demande</button>
    </form>
  );
}

export default DeposerAut;
