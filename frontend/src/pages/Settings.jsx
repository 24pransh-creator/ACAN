function Settings() {
  return (
    <div style={{ color: "white" }}>
      <h1 style={{ color: "#22c55e" }}>
        ⚙ ACAN Settings
      </h1>

      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
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
          <h3>🌐 Language</h3>

          <select
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <option>English</option>
            <option>Gujarati</option>
            <option>Hindi</option>
          </select>
        </div>

        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>📷 Camera Quality</h3>

          <select
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <option>720P</option>
            <option>1080P</option>
            <option>4K</option>
          </select>
        </div>

        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>🔔 Alert Sound</h3>

          <button
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Enable Alert
          </button>
        </div>

        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>🔒 Security</h3>

          <button
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;