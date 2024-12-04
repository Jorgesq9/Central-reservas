import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authservice";

const AdminRoute = ({ children }) => {
  const user = getCurrentUser();

  if (!user) {
    alert("Por favor, inicia sesión primero.");
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    alert("Acceso denegado: Solo administradores pueden acceder.");
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
