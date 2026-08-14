import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid user data");
      }
    }
  }, []);

  const roleName = {
    superadmin: "Super Admin",
    railway: "Railway Officer",
    forest: "Forest Officer",
    viewer: "Viewer",
    train_driver: "Train Driver",
  };

  return (
    <div
      style={{
        color: "white",
        padding: "10px",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#22c55e",
          }}
        >
          🏠 Dashboard
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "8px",
          }}
        >
          Animal Crossing Alert Network — Railway Control Dashboard
        </p>
      </div>

      {/* Logged-in User Information */}
      {user && (
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #22c55e",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#22c55e",
            }}
          >
            Welcome, {user.fullName}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "15px",
            }}
          >
            <div>
              <small style={{ color: "#94a3b8" }}>
                Employee ID
              </small>

              <div style={{ marginTop: "5px" }}>
                {user.employeeId || "N/A"}
              </div>
            </div>

            <div>
              <small style={{ color: "#94a3b8" }}>
                Train Number
              </small>

              <div
                style={{
                  marginTop: "5px",
                  color: "#22c55e",
                  fontWeight: "bold",
                }}
              >
                {user.trainNumber || "N/A"}
              </div>
            </div>

            <div>
              <small style={{ color: "#94a3b8" }}>
                Zone / Division
              </small>

              <div style={{ marginTop: "5px" }}>
                {user.zoneDivision || "N/A"}
              </div>
            </div>

            <div>
              <small style={{ color: "#94a3b8" }}>
                Role
              </small>

              <div style={{ marginTop: "5px" }}>
                {roleName[user.role] || user.role}
              </div>
            </div>

            <div>
              <small style={{ color: "#94a3b8" }}>
                Mobile
              </small>

              <div style={{ marginTop: "5px" }}>
                {user.mobile || "N/A"}
              </div>
            </div>

            <div>
              <small style={{ color: "#94a3b8" }}>
                Account Status
              </small>

              <div
                style={{
                  marginTop: "5px",
                  color: user.isActive ? "#22c55e" : "#ef4444",
                  fontWeight: "bold",
                }}
              >
                {user.isActive ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {[
          "AI Status",
          "Camera Status",
          "Today's Alerts",
          "Animals Detected",
          "Running Trains",
          "Track Status",
          "Emergency",
          "System Health",
        ].map((item) => (
          <div
            key={item}
            style={{
              background: "#1f2937",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #22c55e",
            }}
          >
            <h3>{item}</h3>

            <p
              style={{
                color: "#22c55e",
                fontWeight: "bold",
              }}
            >
              Live
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;