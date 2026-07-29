function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const cards = [
    { title: "Railway Officers", value: "12", icon: "👮" },
    { title: "AI Cameras", value: "48", icon: "📹" },
    { title: "Live Trains", value: "23", icon: "🚆" },
    { title: "Animal Alerts", value: "03", icon: "🐘" },
    { title: "Emergency Cases", value: "00", icon: "🚨" },
    { title: "Track Health", value: "98%", icon: "🛤️" },
  ];

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ color: "#22c55e" }}>
        Welcome, {user?.fullName}
      </h1>

      <p>Super Administrator Control Center</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              background: "#1e293b",
              border: "1px solid #22c55e",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h2>{card.icon}</h2>
            <h3>{card.title}</h3>
            <h1 style={{ color: "#22c55e" }}>
              {card.value}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;