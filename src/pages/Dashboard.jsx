import React, { useEffect, useState } from "react";
import {
  getReservations,
  updateReservation,
} from "../services/reservationService";
import ReservationList from "../components/ReservationList";
import ReservationForm from "../components/ReservationForm";

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        setReservations(data);
      } catch (error) {
        console.error("Error loading the reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleUpdate = async (updatedReservation) => {
    try {
      const updatedData = await updateReservation(
        updatedReservation._id,
        updatedReservation
      );
      setReservations((prev) =>
        prev.map((res) => (res._id === updatedData._id ? updatedData : res))
      );
      setSelectedReservation(null);
    } catch (error) {
      console.error("Error updating the reservation:", error.message);
    }
  };

  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);
  };

  if (loading) return <p>Cargando reservas...</p>;

  return (
    <div>
      <h1>Central de Reservas</h1>
      <ReservationList
        reservations={reservations}
        onEdit={handleEdit}
        applyFilters={true}
      />
      {selectedReservation && (
        <div>
          <h2>Editar Reserva</h2>
          <ReservationForm
            reservation={selectedReservation}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
