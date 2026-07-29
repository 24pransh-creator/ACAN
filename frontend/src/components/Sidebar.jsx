import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role || "";

  const dashboardLink =
    role === "superadmin"
      ? "/super-admin"
      : role === "railway"
      ? "/railway"
      : role === "forest"
      ? "/forest"
      : "/";

  return (
    <div
      style={{
        width: "260px",
        background: "#111827",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#22c55e" }}>ACAN</h1>

      <hr />

      <Link
        to={dashboardLink}
        style={{
          color: "white",
          textDecoration: "none",
          display: "block",
          margin: "18px 0",
        }}
      >
        🏠 Dashboard
      </Link>

      {role === "superadmin" && (
        <>
          <Link
            to="/officers"
            style={{
              color: "white",
              textDecoration: "none",
              display: "block",
              margin: "18px 0",
            }}
          >
            👮 Officer Management
          </Link>

          <Link
            to="/trains"
            style={{
              color: "white",
              textDecoration: "none",
              display: "block",
              margin: "18px 0",
            }}
          >
            🚆 Train Management
          </Link>

          <Link
            to="/camera"
            style={{
              color: "white",
              textDecoration: "none",
              display: "block",
              margin: "18px 0",
            }}
          >
            📹 Cameras
          </Link>

          <Link
            to="/settings"
            style={{
              color: "white",
              textDecoration: "none",
              display: "block",
              margin: "18px 0",
            }}
          >
            ⚙ Settings
          </Link>
        </>
      )}

      <Link
        to="/login"
        onClick={() => {
          localStorage.clear();
        }}
        style={{
          color: "#ef4444",
          textDecoration: "none",
          display: "block",
          marginTop: "40px",
        }}
      >
        🚪 Logout
      </Link>
    </div>
  );
}

export default Sidebar;