import React, { useState, useEffect } from "react";
import "../pages/PagesStyle.css";

const ReservationList = ({
  reservations = [],
  onEdit,
  applyFilters = true,
}) => {
  const [filteredReservations, setFilteredReservations] =
    useState(reservations);
  const [filters, setFilters] = useState({
    reservationStatus: "",
    priority: "",
    startDate: "",
    endDate: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Ejecutar el filtrado solo si las dependencias cambian
    if (applyFilters) {
      const filtered = reservations.filter((reservation) => {
        const matchesStatus =
          !filters.reservationStatus ||
          reservation.reservationStatus === filters.reservationStatus;
        const matchesPriority =
          !filters.priority || reservation.priority === filters.priority;
        const matchesStartDate =
          !filters.startDate ||
          new Date(reservation.date) >= new Date(filters.startDate);
        const matchesEndDate =
          !filters.endDate ||
          new Date(reservation.date) <= new Date(filters.endDate);
        return (
          matchesStatus && matchesPriority && matchesStartDate && matchesEndDate
        );
      });

      // Solo actualiza si los valores realmente cambian
      if (JSON.stringify(filtered) !== JSON.stringify(filteredReservations)) {
        setFilteredReservations(filtered);
      }

      if (
        filtered.length === 0 &&
        message !== "No hay reservas con esas características."
      ) {
        setMessage("No hay reservas con esas características.");
      } else if (filtered.length > 0 && message) {
        setMessage("");
      }
    } else {
      if (
        JSON.stringify(filteredReservations) !== JSON.stringify(reservations)
      ) {
        setFilteredReservations(reservations);
      }
      if (message) setMessage("");
    }
  }, [filters, reservations, applyFilters, filteredReservations, message]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="page-container">
      <h2>Lista de Reservas</h2>

      {/* Filtros */}
      {applyFilters && (
        <div className="filters-container">
          <div className="form-group">
            <label htmlFor="reservationStatus">Estado:</label>
            <select
              id="reservationStatus"
              name="reservationStatus"
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="in_progress">En Progreso</option>
              <option value="completed">Completado</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Prioridad:</label>
            <select id="priority" name="priority" onChange={handleFilterChange}>
              <option value="">Todos</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Fecha Inicio:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Fecha Fin:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={handleFilterChange}
            />
          </div>
        </div>
      )}

      {/* Mensaje si no hay reservas */}
      {message && <p>{message}</p>}

      {/* Tabla de Reservas */}
      {filteredReservations.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.serviceType}</td>
                <td>{reservation.client?.name}</td>
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{reservation.reservationStatus}</td>
                <td>{reservation.priority}</td>
                <td className="action-buttons">
                  <button
                    className="button"
                    onClick={() => onEdit(reservation)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationList;
