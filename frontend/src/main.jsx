import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";

import Login from "./pages/Login";
import Dashboard from "./pages/superadmin/Dashboard";
import LiveCamera from "./pages/LiveCamera";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Main Layout */}
        <Route path="/" element={<App />}>

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="camera"
            element={<LiveCamera />}
          />

        <Route path="super-admin" element={<Dashboard />} />  
      
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);