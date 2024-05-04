import React, { useState } from "react";
import Login from "./Login";
import LeaveRequest from "./exemple";
import PointageTable from "./pointage";
import CongePage from "./consulter congé";
import AbsenceTable from "./consulter mes congé";
import Validerconge from "./validercongé";
import Validerautorisation from "./validerautorisation";
import NavBar from "./nav";
import AutorisationsPage from "./consulter autorisation";
import DeposerAut from "./l_authorisation";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Acceuil from "./accueil";
import ConsulterAbs from "./consulter mes congé";
import Historiquesalaire from "./consulter salaire";
import Historiqueprets from "./consulter prets";
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false); // State pour la connexion
  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  } else {
    return (
      <Router>
        <div>
        <img class="logo" src="C:\Users\nesri\Desktop\projetkemel\nesFront\nesFront\src\petrole.png" alt="Logo de mon entreprise" />

          <NavBar setLoggedIn={setLoggedIn} />
          <Routes>
            
          <Route path="/" element={<Acceuil/>}></Route>
          <Route path="/deposerconge" element={<AbsenceTable />}></Route>
            <Route path="/deposercongee" element={<LeaveRequest />}></Route>
            <Route path="/consulterListeConge" element={<CongePage />}></Route>
            <Route path="/validerConge" element={<Validerconge />}></Route>
            <Route path="/validerAut" element={<Validerautorisation />}></Route>
            <Route path="/ConsulterAut" element={<AutorisationsPage />}></Route>
            <Route path="/DeposerAut" element={<DeposerAut />}></Route>
            <Route path="/pointage" element={<PointageTable/>}></Route>
            <Route path="/absence" element={<ConsulterAbs/>}></Route>
            <Route path="/salaire" element={<Historiquesalaire/>}></Route>
            <Route path="/pret" element={<Historiqueprets/>}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}
