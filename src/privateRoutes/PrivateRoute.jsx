import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authservice";

const PrivateRoute = ({ children }) => {
  const user = getCurrentUser();

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
