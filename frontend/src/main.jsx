import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import App from "./App";

// Auth
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

// Driver
import Dashboard from "./pages/Dashboard";
import LiveCamera from "./pages/LiveCamera";
import PhoneCamera from "./pages/PhoneCamera";

// Super Admin
import SuperAdminDashboard from "./pages/superadmin/Dashboard";
import UserManagement from "./pages/superadmin/UserManagement";
import Settings from "./pages/Settings";

// Pages
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import TrainManagement from "./pages/TrainManagement";
import AnimalDetection from "./pages/AnimalDetection";
import CameraManagement from "./pages/CameraManagement";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/phone-camera" element={<PhoneCamera />} />

        {/* DRIVER */}
        <Route path="/driver" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="camera" element={<LiveCamera />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* SUPER ADMIN */}
        <Route path="/super-admin" element={<App />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="camera" element={<LiveCamera />} />
          <Route path="camera-management" element={<CameraManagement />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="trains" element={<TrainManagement />} />
          <Route path="animals" element={<AnimalDetection />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);