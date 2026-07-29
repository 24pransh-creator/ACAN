function SuperAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1 style={{ color: "#22c55e" }}>
        Super Admin Dashboard
      </h1>

      <hr />

      <h3>Welcome</h3>

      <p>
        <b>Name :</b> {user?.fullName}
      </p>

      <p>
        <b>Email :</b> {user?.email}
      </p>

      <p>
        <b>Role :</b> {user?.role}
      </p>

      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px"
        }}
      >
        <div className="card">
          👮 Officer Management
        </div>

        <div className="card">
          🚆 Train Management
        </div>

        <div className="card">
          📹 Camera Management
        </div>

        <div className="card">
          🛤 Track Management
        </div>

        <div className="card">
          🚨 Emergency Control
        </div>

        <div className="card">
          ⚙ System Settings
        </div>
      </div>
    </div>
  );
}

export default SuperAdmin;