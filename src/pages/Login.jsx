import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWorker } from "../services/authService";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWorker({ userName, password });
      Navigate("/");
    } catch (error) {
      alert("Error al iniciar sesion, verifica tus credenciales");
    }
  };
  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Empleado"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
