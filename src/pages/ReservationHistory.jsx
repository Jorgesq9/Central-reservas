import React, { useState, useEffect } from "react";
import { getReservations } from "../services/reservationService";
import { getStatusHistory } from "../services/reservationService";
import "./PagesStyle.css";

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        console.log("Reservas obtenidas:", data); // Debug para verificar los datos
        setReservations(data);
        setFilteredReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredReservations(
      reservations.filter(
        (res) =>
          res.assignedWorker?.username.toLowerCase().includes(term) ||
          res.serviceType.toLowerCase().includes(term)
      )
    );
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...filteredReservations].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredReservations(sortedData);
  };

  const fetchStatusHistory = async (reservationId) => {
    try {
      setLoading(true);
      const history = await getStatusHistory(reservationId);
      console.log("Historial recibido:", history); // Verifica los datos aquí
      setStatusHistory(history);
      setSelectedReservation(reservationId);
    } catch (error) {
      console.error("Error fetching status history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Reservation History</h2>
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search by worker or service type..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-group"
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("date")}>Date</th>
            <th onClick={() => handleSort("assignedWorker.username")}>
              Worker
            </th>
            <th onClick={() => handleSort("reservationStatus")}>Status</th>
            <th onClick={() => handleSort("serviceType")}>Service Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{new Date(reservation.date).toLocaleDateString()}</td>
              <td>{reservation.assignedWorker?.username || "Unassigned"}</td>
              <td>{reservation.reservationStatus}</td>
              <td>{reservation.serviceType}</td>
              <td>
                <button
                  className="button"
                  onClick={() => fetchStatusHistory(reservation._id)}
                  disabled={loading} // Deshabilita mientras está cargando
                >
                  {loading && selectedReservation === reservation._id
                    ? "Loading..."
                    : "View History"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReservation && (
        <div className="status-history">
          <h3>Status History</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Old Status</th>
                <th>New Status</th>
                <th>Changed By</th>
                <th>Changed At</th>
              </tr>
            </thead>
            <tbody>
              {statusHistory.map((history) => (
                <tr key={history._id}>
                  <td>{history.oldReservationStatus || "Unknown"}</td>
                  <td>{history.newReservationStatus || "Unknown"}</td>
                  <td>{history.changedBy?.username || "Unknown"}</td>
                  {""}
                  {/* Renderiza el nombre */}
                  <td>{new Date(history.changedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationHistory;
