import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./exemple.css";
function NavBar({ setLoggedIn }) {
  const personelM = JSON.parse(localStorage.getItem("personel"));
  const status = personelM.status;
  if (status == "superviseur") {
    return (
      <nav>
        <nav>
          <ul style={{ display: "flex", justifyContent: "space-between" }}>
            <li>
              <Link to="/">Acceuil</Link>
            </li>
            <li>
              <Link to="/pointage">pointage</Link>
            </li>
            <li>
              <Link to="/absence">absences</Link>
            </li>
            <li>
              <Link to="pret">Prets</Link>
            </li>
            <li>
              <Link to="/salaire">salaire</Link>
            </li>
            <li>
              <Link to="/deposercongee">deposer Conge</Link>
            </li>
            <li>
              <Link to="/deposerAut">deposer autorisation</Link>
            </li>
            <li>
              <Link to="/consulterListeConge">Gerer conge</Link>
            </li>
            <li>
              <Link to="/ConsulterAut">Gerer Autorisation</Link>
            </li>
            <li>
              <button>Déconnexion</button>
            </li>
          </ul>
        </nav>
      </nav>
    );
  } else if (status == "pointage") {
    return (
      <nav>
        <nav>
          <ul style={{ display: "flex", justifyContent: "space-between" }}>
            <li>
              <Link to="/">Acceuil</Link>
            </li>
            <li>
              <Link to="/pointage">pointage</Link>
            </li>
            <li>
              <Link to="/absence">absences</Link>
            </li>
            <li>
              <Link to="/pret">Prets</Link>
            </li>
            <li>
              <Link to="/salaire">salaire</Link>
            </li>
            <li>
            <Link to="/deposerAut">deposer autorisation</Link>
            </li>
            <li>
              <Link to="/deposercongee">deposer Conge</Link>
            </li>
            <li>
              <Link to="/validerAut">valider autorisation</Link>
            </li>
            <li>
              <Link to="/validerConge">valider conge</Link>
            </li>
            <li>
              <button>Déconnexion</button>
            </li>
          </ul>
        </nav>
      </nav>
    );
  } else {
    return (
      <nav>
        <nav>
          <ul style={{ display: "flex", justifyContent: "space-between" }}>
            <li>
              <Link to="/">Acceuil</Link>
            </li>
            <li>
              <Link to="/pointage">pointage</Link>
            </li>
            <li>
              <Link to="/absence">absences</Link>
            </li>
            <li>
              <Link to="/pret">Prets</Link>
            </li>
            <li>
              <Link to="/salaire">salaire</Link>
            </li>
            <li>
              <Link to="/deposercongee">deposer Conge</Link>
            </li>
            <li>
              <Link to="/deposerAut">deposer autorisation</Link>
            </li>
            <li>
              <button>Déconnexion</button>
            </li>
          </ul>
        </nav>
      </nav>
    );
  }
}

export default NavBar;