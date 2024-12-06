// Sidebar.jsx
import React from "react";
import "./SidebarStyles.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button
        className={`toggle-button ${
          isOpen ? "close-button" : "hamburger-button"
        }`}
        onClick={toggleSidebar}
      >
        {isOpen ? "✖" : "☰"}
      </button>
      {isOpen && (
        <>
          <h2>Central de Reservas</h2>
          <ul>
            <li>
              <a href="/">Dashboard</a>
            </li>
            <li>
              <a href="/reservations/new">Crear Reserva</a>
            </li>
            <li>
              <a href="/reservations/history">Historial de Reservas</a>
            </li>
            <li>
              <a href="/admin">Administración</a>
            </li>
          </ul>
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
