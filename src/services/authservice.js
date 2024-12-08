import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { token, user } = response.data;

    // Guarda todo en una sola clave 'user' para evitar duplicación
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        token, // Agrega el token como parte del objeto
      })
    );

    console.log("Usuario logueado:", user);
    return response.data;
  } catch (error) {
    console.error("Error en el login:", error.response?.data || error.message);
    throw error;
  }
};

export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.warn("No se encontró usuario en localStorage");
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error al recuperar el usuario de localStorage:", error);
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
