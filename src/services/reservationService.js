import axios from "axios";

const API_URL = "http://localhost:5000/api/reservations";

// Función auxiliar para obtener el token desde el usuario almacenado en localStorage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token)
    throw new Error("Token no encontrado. Inicia sesión nuevamente.");
  return user.token;
};

// Obtener todas las reservas con filtros opcionales
export const getReservations = async (filters = {}) => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener reservas:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Crear una nueva reserva
export const createReservation = async (reservationData) => {
  try {
    const token = getToken();

    if (
      !reservationData.date ||
      !reservationData.serviceType
      /* || !reservationData.clientId*/
    ) {
      throw new Error("Datos incompletos para la reserva.");
    }

    const response = await axios.post(API_URL, reservationData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear la reserva:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Actualizar una reserva existente
export const updateReservation = async (id, updates) => {
  try {
    const token = getToken();

    const response = await axios.patch(`${API_URL}/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar la reserva:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Eliminar una reserva existente
export const deleteReservation = async (id) => {
  try {
    const token = getToken();

    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar la reserva:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getStatusHistory = async (reservationId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/${reservationId}/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener el historial de estado:",
      error.response?.data || error.message
    );
    throw error;
  }
};
