import React from "react";

const ReservationList = ({ reservation }) => {
  return (
    <div>
      <h2>Lista de Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.serviceType}</td>
              <td>{reservation.client?.name}</td>{" "}
              {/* el ? es para asegurar que si client es null o undefined no haya error */}
              <td>{new Date(reservation.date).toLocaleDateString()}</td>
              <td>{reservation.status}</td>
              <td>
                {/* Botones para editar o eliminar */}
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
