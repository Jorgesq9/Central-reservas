import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginWorker = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem("worker", JSON.stringify(response.data));
  return response.data;
};

export const logoutWorker = () => {
  localStorage.removeItem("worker");
};

export const getCurrentWorker = () => {
  return JSON.parse(localStorage.getItem("worker"));
};
