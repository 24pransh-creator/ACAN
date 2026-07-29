function Dashboard() {
  return (
    <div style={{ color: "white" }}>
      <h1>🏠 Dashboard</h1>
      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
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
            <p style={{ color: "#22c55e" }}>Live</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;