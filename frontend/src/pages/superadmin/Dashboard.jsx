import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalRailway: 0,
    totalForest: 0,
    totalViewers: 0,
    totalTrains: 0,
    totalCameras: 0,
    totalAlerts: 0,
    aiStatus: "",
    systemHealth: "",
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setDashboard(res.data.dashboard);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ color: "#22c55e" }}>
        🚆 ACAN Super Admin Dashboard
      </h1>

      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
        }}
      >
        <Card
          title="👥 Total Users"
          value={dashboard.totalUsers}
          color="#2563eb"
        />

        <Card
          title="🚂 Train Drivers"
          value={dashboard.totalDrivers}
          color="#16a34a"
        />

        <Card
          title="📷 Cameras"
          value={dashboard.totalCameras}
          color="#9333ea"
        />

        <Card
          title="🚨 Alerts"
          value={dashboard.totalAlerts}
          color="#dc2626"
        />

        <Card
          title="🚆 Trains"
          value={dashboard.totalTrains}
          color="#0891b2"
        />

        <Card
          title="🛤 Railway Officers"
          value={dashboard.totalRailway}
          color="#ea580c"
        />

        <Card
          title="🌳 Forest Officers"
          value={dashboard.totalForest}
          color="#15803d"
        />

        <Card
          title="👀 Viewers"
          value={dashboard.totalViewers}
          color="#6b7280"
        />
      </div>

      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>🤖 AI Status</h2>

          <h3 style={{ color: "#22c55e" }}>
            {dashboard.aiStatus}
          </h3>

          <br />

          <h2>❤️ System Health</h2>

          <h3 style={{ color: "#22c55e" }}>
            {dashboard.systemHealth}
          </h3>
        </div>

        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>⚡ Quick Actions</h2>

          <button style={btn}>👤 Add User</button>

          <button style={btn}>🚆 Add Train</button>

          <button style={btn}>📷 Live Cameras</button>

          <button style={btn}>🚨 Alert Center</button>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

const btn = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Dashboard;