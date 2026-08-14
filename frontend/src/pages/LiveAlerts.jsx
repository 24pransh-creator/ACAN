function LiveAlerts() {
  const alerts = [
    {
      id: 1,
      animal: "Lion",
      location: "Junagadh Track",
      train: "962011",
      status: "High Risk",
      time: "17:30",
    },
    {
      id: 2,
      animal: "Cow",
      location: "Track 5",
      train: "145022",
      status: "Medium",
      time: "17:35",
    },
  ];

  return (
    <div style={{ color: "white" }}>
      <h1>🚨 Live Alerts</h1>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#1f2937" }}>
            <th>ID</th>
            <th>Animal</th>
            <th>Location</th>
            <th>Train</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((a) => (
            <tr
              key={a.id}
              style={{
                textAlign: "center",
                borderBottom: "1px solid gray",
              }}
            >
              <td>{a.id}</td>
              <td>{a.animal}</td>
              <td>{a.location}</td>
              <td>{a.train}</td>
              <td style={{ color: "red" }}>{a.status}</td>
              <td>{a.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LiveAlerts;