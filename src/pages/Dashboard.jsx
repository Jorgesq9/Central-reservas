import React, { useEffect, useState } from "react";
import { getReservations } from "../services/reservationService";
import ReservationList from "../components/ReservationList";

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h1>Central de Reservas</h1>
      <StatisticsPanel />
      <ReservationList reservations={reservations} />
    </div>
  );
};

export default Dashboard;
