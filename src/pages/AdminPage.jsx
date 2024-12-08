import React, { useState, useEffect } from "react";
import {
  deleteReservation,
  getReservations,
} from "../services/reservationService";
import AdminReservationList from "../components/AdminReservationList";
import "../pages/PagesStyle.css";

const AdminPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar todas las reservas al montar el componente
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations(); // Llama al servicio que obtiene todas las reservas
        setReservations(data);
      } catch (error) {
        console.error("Error al obtener las reservas:", error.message);
        alert("No se pudieron cargar las reservas.");
      } finally {
        setLoading(false); // Oculta el indicador de carga
      }
    };

    fetchReservations();
  }, []);

  // Manejo de eliminación de reservas
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
      try {
        await deleteReservation(id);
        // Filtrar la reserva eliminada de la lista local
        setReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation._id !== id)
        );
        alert("Reserva eliminada con éxito");
      } catch (error) {
        console.error("Error eliminando la reserva:", error.message);
        alert("No se pudo eliminar la reserva");
      }
    }
  };

  if (loading) {
    return <div>Cargando reservas...</div>;
  }

  return (
    <div>
      <AdminReservationList
        reservations={reservations} // Pasamos las reservas al componente
        onDelete={handleDelete} // Lógica de eliminación
      />
    </div>
  );
};

export default AdminPage;
