import React, { useState, useEffect } from "react";
import "./exemple.css";
import NavBar from "./nav";
import axios from "axios";

const LeaveRequest = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDays, setLeaveDays] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [daysRequested, setDaysRequested] = useState("");
  const [raisonConge, setRaisonConge] = useState("");
  const [personleT, setpersonelT] = useState({});

  //deposer conge  :
  const personelM = JSON.parse(localStorage.getItem("personel"));
  const DeposerConge = async (idPersonel) => {
    console.log("ykdfjhskldfjl");
    const body = { leaveType, startDate, endDate, raisonConge };
    console.log(body);
    try {
      const res = await axios.post(
        `http://localhost:6060/conge/${idPersonel}`,
        body
      );
      alert("conge en attente");
    } catch (error) {
      alert("conge n'est pas envoyer  , reenvoyer");
      console.log(error);
    }
  };

  //get solde  :
  useEffect(() => {
    const id = personelM.idPersonle;
    console.log({ id });
    const getSoldeConge = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:6060/conge/soldeConge/${id}`
        );
        console.log(response.data);
        setpersonelT(response.data);
      } catch (error) {
        alert("get solde conge ne marche pas ");
        console.log(error);
      }
    };
    getSoldeConge(personelM.idPersonle);
  }, []);

  console.log(personleT);

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    //get personel   :

    // Vérification de la date de fin
    const diffTime = new Date(e.target.value) - new Date(startDate);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    if (diffDays <= 0) {
      setAlertMessage("La date de fin doit être supérieure à la date de début");
      setShowAlert(true);
      return;
    }

    // Calcul du nombre de jours
    setLeaveDays(diffDays);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
      setDaysRequested(diff);
    }
  }, [startDate, endDate]);
  return (
    <body>
      <NavBar />
      <h1>Demande de congé</h1>
      {showAlert && (
        <div className="alert">
          <p>{alertMessage}</p>
          <button onClick={() => setShowAlert(false)}>Fermer</button>
        </div>
      )}
      <div className="leave-types-container">
        <span
          className="leave-type-rectangle"
          onMouseEnter={() => setLeaveType("Congé annuel")}
        >
          Congé annuel: {personleT.soldeCongeAnnuel}
        </span>
        <span
          className="leave-type-rectangle"
          onMouseEnter={() => setLeaveType("Congé exceptionnel")}
        >
          Congé exceptionnel:{personleT.soldeCongeException}
        </span>
        <span
          className="leave-type-rectangle"
          onMouseEnter={() => setLeaveType("Congé de récupération")}
        >
          Congé de récupération:{personleT.soldeCongeRecup}
        </span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          DeposerConge(personelM.idPersonle);
        }}
      >
        <label>
          Type de congé:
          <select
            value={leaveReason}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="annuel">annuel</option>
            <option value="exceptionel">exceptionel</option>
            <option value="recuperation">Recupération</option>
          </select>
        </label>
        <br />
        <label>
          Date de début:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date de fin:*
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label>
          raison :
          <input
            type="text"
            value={raisonConge}
            onChange={(e) => setRaisonConge(e.target.value)}
          />
        </label>

        <br />
        <br />
        <button type="submit">valider</button>
      </form>

      {daysRequested && <p>Vous avez demandé {daysRequested} jours de congé</p>}
    </body>
  );
};

export default LeaveRequest;
