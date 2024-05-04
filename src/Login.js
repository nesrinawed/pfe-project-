import axios from "axios";
import React, { useState } from "react";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ici, vous pouvez envoyer les informations de connexion au serveur pour vérification
    const response = await axios.post("http://localhost:6060/personel/auth", {
      email,
      password,
    });
    if (response.data === "not account found for this user ") {
      alert("not accout found");
    } else if (response.data === "wrong password") {
      alert("wrong password");
    } else {
      localStorage.setItem("personel", JSON.stringify(response.data));
      alert("success");
      setLoggedIn(true);
    }
  };

  return (
    <div className="loginpage">
      <h1 className>Login Page</h1>
      <form onSubmit={handleSubmit} className="login">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="envoyer">Login</button>
      </form>
    </div>
  );
};

export default Login;
