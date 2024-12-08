import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authservice";

const AdminRoutes = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta

  useEffect(() => {
    // Cargar usuario desde localStorage
    const user = getCurrentUser();
    console.log("Usuario cargado en AdminRoutes:", user);
    setCurrentUser(user);
    setIsInitialized(true); // Marcar que la inicialización ha terminado
  }, []);

  if (!isInitialized) {
    console.log("Esperando inicialización...");
    return <div>Cargando...</div>;
  }

  if (!currentUser) {
    if (!showAlert) {
      setShowAlert(true); // Mostrar alerta una vez
      alert("Usario no registrado: Haz Log in");
    }
    // Redirigir después de mostrar la alerta
    return <Navigate to="/" replace />;
  }

  // **Validación del rol**
  const role = currentUser?.user?.role; // Accede al rol dentro del objeto anidado
  console.log("Rol del usuario evaluado:", role);

  if (role !== "admin") {
    if (!showAlert) {
      setShowAlert(true); // Mostrar alerta una vez
      alert("Acceso denegado: Solo administradores pueden acceder");
    }
    // Redirigir después de mostrar la alerta
    return <Navigate to="/" replace />;
  }

  // Renderizar contenido protegido si todo está bien
  console.log("Usuario verificado como administrador, mostrando contenido...");
  return children;
};

export default AdminRoutes;
