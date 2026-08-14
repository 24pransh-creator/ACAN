import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "";

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#22c55e" }}>🚆 ACAN</h2>

      <hr />

      {/* ================= SUPER ADMIN ================= */}

      {role === "superadmin" && (
        <>
          <Link to="/super-admin" style={menuStyle}>
            🏠 Dashboard
          </Link>

          <Link to="/super-admin/users" style={menuStyle}>
            👥 User Management
          </Link>

          <Link to="/super-admin/trains" style={menuStyle}>
            🚆 Train Management
          </Link>

          <Link to="/super-admin/camera-management" style={menuStyle}>
            📹 Camera Management
          </Link>

          <Link to="/super-admin/camera" style={menuStyle}>
            🎥 Live Camera
          </Link>

          <Link to="/super-admin/animals" style={menuStyle}>
            🐘 Animal Detection
          </Link>

          <Link to="/super-admin/alerts" style={menuStyle}>
            🚨 Live Alerts
          </Link>

          <Link to="/super-admin/reports" style={menuStyle}>
            📊 Reports
          </Link>

          <Link to="/super-admin/settings" style={menuStyle}>
            ⚙️ Settings
          </Link>
        </>
      )}

      {/* ================= TRAIN DRIVER ================= */}

      {role === "train_driver" && (
        <>
          <Link to="/driver" style={menuStyle}>
            🏠 Dashboard
          </Link>

          <Link to="/driver/camera" style={menuStyle}>
            🎥 Live Camera
          </Link>

          <Link to="/driver/alerts" style={menuStyle}>
            🚨 Alerts
          </Link>

          <Link to="/driver/reports" style={menuStyle}>
            📊 Reports
          </Link>
        </>
      )}

      <hr />

      <Link
        to="/login"
        onClick={() => localStorage.clear()}
        style={{
          color: "#ef4444",
          textDecoration: "none",
          display: "block",
          marginTop: "20px",
          fontWeight: "bold",
        }}
      >
        🚪 Logout
      </Link>
    </div>
  );
}

const menuStyle = {
  display: "block",
  color: "white",
  textDecoration: "none",
  padding: "10px 0",
  fontSize: "16px",
};

export default Sidebar;