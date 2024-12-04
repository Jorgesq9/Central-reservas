import React from "react";
import ReservationList from "../components/ReservationList";
import ReservationForm from "../components/ReservationForm";

import { deleteReservation } from "../services/reservationService";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authservice";

const AdminPage = () => {
  const user = getCurrentUser;

  if (!user || user.role !== "admin") {
    alert("Acceso denegado:Solo administradores pueden acceder");
    return <Navigate to="/login" />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
      try {
        await deleteReservation(id);
        alert("Reserva eliminada con exito");
      } catch (error) {
        console.error("Error eliminando la reserva:", error.message);
        alert("No se pudo eliminar la reserva");
      }
    }
  };

  return (
    <div>
      <h1>Panel de Administración</h1>
      {/* Reutilizamos ReservationList */}
      <ReservationList
        onDelete={handleDelete} // Añadimos la lógica de eliminación
        allowDelete={true} // Habilitamos el botón de eliminar
        applyFilters={true} // Habilitamos los filtros
      />
    </div>
  );
};

export default AdminPage;
