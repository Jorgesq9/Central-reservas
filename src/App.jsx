import React, { Children } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import CreateReservation from "./pages/CreateReservation";
import ReservationHistory from "./pages/ReservationHistory";
import Login from "./pages/Login";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./privateRoutes/AdminRoutes";
import Sidebar from "./components/SideBar";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Router>
      <Routes>
        {/* ruta de inicio de sesion */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas para los empleados*/}

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div
                className={`page-content ${
                  isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
              ></div>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div
                className={`page-content ${
                  isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
              ></div>
              <AdminPage />
            </AdminRoute>
          }
        />

        <Route
          path="/reservations/new"
          element={
            <PrivateRoute>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div
                className={`page-content ${
                  isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
              ></div>
              <CreateReservation />
            </PrivateRoute>
          }
        />

        <Route
          path="reservations/history"
          element={
            <PrivateRoute>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div
                className={`page-content ${
                  isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
              ></div>
              <ReservationHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
