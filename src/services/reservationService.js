import axios from "axios";

const API_URL = "http://localhost:5000/api/reservations";

export const getReservations = async () => {
  const token = JSON.parse(localStorage.getItem("worker")).token;
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Barer ${token}`,
    },
  });
  return response.data;
};

export const createReservation = async (reservationData) => {
  const token = JSON.parse(localStorage.getItem("worker")).token;
  const response = await axios.post(API_URL, reservationData, {
    headers: {
      Authorization: `Barer ${token}`,
    },
  });
  return response.data;
};
