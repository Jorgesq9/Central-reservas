import React, { useState } from "react";
import "./PagesStyle.css";
import { createReservation } from "../services/reservationService";

const CreateReservation = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    serviceType: "",
    date: "",
    reservationStatus: "pending",
    priority: "low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construimos el objeto que espera la API, incluyendo el cliente como un objeto
      const reservationData = {
        ...formData,
        client: {
          name: formData.clientName, // Incluimos el nombre del cliente en el objeto `client`
        },
      };
      await createReservation(reservationData);

      alert("Reserva creada exitosamente");
      setFormData({
        clientName: "",
        serviceType: "",
        date: "",
        reservationStatus: "pending",
        priority: "low",
      }); // Resetea el formulario después de la creación
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      alert("Hubo un error al crear la reserva");
    }
  };

  return (
    <div className="page-container">
      <h2>Crear Nueva Reserva</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {/* Información del Cliente */}
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

        {/* Información de la Reserva */}
        <div className="form-group">
          <label htmlFor="serviceType">Tipo de Servicio</label>
          <input
            type="text"
            id="serviceType"
            name="serviceType"
            value={formData.serviceType || ""}
            onChange={handleChange}
            placeholder="Tipo de Servicio"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Fecha de la Reserva</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date || ""}
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
          Crear Reserva
        </button>
      </form>
    </div>
  );
};

export default CreateReservation;
