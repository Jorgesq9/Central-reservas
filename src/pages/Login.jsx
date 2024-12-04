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
    <div>
      <h1>Iniciar Sesión</h1>
      <input
        type="text"
        placeholder="Usuario"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
