function Navbar() {
  return (
    <div
      style={{
        height: "70px",
        background: "#1f2937",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "2px solid #22c55e",
      }}
    >
      <h2>🚆 ACAN Control Center</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <span>🟢 AI Online</span>
        <span>🔔 Notifications</span>
        <span>👤 Admin</span>
      </div>
    </div>
  );
}

export default Navbar;