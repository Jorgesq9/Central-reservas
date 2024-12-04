import React, { Children } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateReservation from "./pages/CreateReservation";
import ReservationHistory from "./pages/ReservationHistory";
import Login from "./pages/Login";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./privateRoutes/AdminRoutes";

const App = () => {
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
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        <Route
          path="/reservations/new"
          element={
            <PrivateRoute>
              <CreateReservation />
            </PrivateRoute>
          }
        />

        <Route
          path="reservations/history"
          element={
            <PrivateRoute>
              <ReservationHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
