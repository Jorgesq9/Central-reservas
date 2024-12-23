import React, { useEffect, useState } from "react";
import {
  getReservations,
  updateReservation,
} from "../services/reservationService";
import ReservationList from "../components/ReservationList";
import ReservationForm from "../components/ReservationForm";
import "./PagesStyle.css";

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        setReservations(data);
        setFilteredReservations(data); // Inicialmente, mostrar todas las reservas
      } catch (error) {
        console.error("Error loading the reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredReservations(
      reservations.filter((res) =>
        res.client?.name?.toLowerCase().includes(term)
      )
    );
  };
  const handleUpdate = async (updatedReservation) => {
    try {
      const updatedData = await updateReservation(
        updatedReservation._id,
        updatedReservation
      );
      setReservations((prev) =>
        prev.map((res) => (res._id === updatedData._id ? updatedData : res))
      );
      setFilteredReservations((prev) =>
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
    <div className="page-container">
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search by client name..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-group"
        />
      </div>
      <div className="reservation-layout">
        {/* Lista de Reservas */}
        <div
          className={`reservation-list ${selectedReservation ? "shrink" : ""}`}
        >
          <ReservationList
            reservations={filteredReservations}
            onEdit={handleEdit}
            applyFilters={true}
          />
        </div>
        {/* Formulario de Reservas */}
        {selectedReservation && (
          <div className="reservation-form">
            <ReservationForm
              reservation={selectedReservation}
              onUpdate={handleUpdate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
