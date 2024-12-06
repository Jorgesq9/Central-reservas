import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authservice";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userData = await loginUser(credentials);
      localStorage.setItem("user", JSON.stringify(userData)); // Guarda el usuario en localStorage
      navigate("/"); // Redirige al Dashboard
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Iniciar Sesión</h1>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            placeholder="Usuario"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <button className="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
