import React, { useState } from "react";
import { data } from "react-router-dom";

const ReservationForm = ({ reservation, onUpdate }) => {
  const [formData, setFormData] = useState({
    serviceType: reservation.serviceType,
    client: reservation.client,
    date: reservation.date.slice(0, 10),
    status: reservation.status,
    priority: reservation.priority,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate({ ...reservation, ...formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="serviceType"
        value={formData.serviceType}
        onChange={handleChange}
        placeholder="Tipo de Servicio"
      />

      <input
        type="text"
        name="client.name"
        value={formData.client?.name}
        onChange={(e) =>
          setFormData((prevData) => ({
            ...prevData,
            client: { ...prevData.client, name: e.target.value },
          }))
        }
        placeholder="Nombre del cliente"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="pending">Pendiente</option>
        <option value="in_progress">En progreso</option>
        <option value="completed">Completada</option>
      </select>
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ReservationForm;
