import React, { useState } from "react";
import "../pages/PagesStyle.css";

const ReservationForm = ({ reservation, onUpdate }) => {
  const [formData, setFormData] = useState({
    serviceType: reservation.serviceType,
    clientName: reservation.client?.name || "",
    date: reservation.date.slice(0, 10),
    reservationStatus: reservation.reservationStatus,
    priority: reservation.priority,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Actualizamos la reserva incluyendo el nombre del cliente
    const updatedReservation = {
      ...reservation,
      ...formData,
      client: { ...reservation.client, name: formData.clientName },
    };
    onUpdate(updatedReservation);
  };
  return (
    <div className="page-container">
      <h2>Editar Reserva</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="clientName">Nombre del Cliente</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Nombre del Cliente"
          />
        </div>

        <div className="form-group">
          <label htmlFor="serviceType">Tipo de Servicio</label>
          <input
            type="text"
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            placeholder="Tipo de Servicio"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservationStatus">Estado</label>
          <select
            id="reservationStatus"
            name="reservationStatus"
            value={formData.reservationStatus}
            onChange={handleChange}
          >
            <option value="pending">Pendiente</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completada</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Prioridad</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <button type="submit" className="button">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
