function AnimalDetection() {
  return (
    <div style={{ color: "white" }}>
      <h1 style={{ color: "#22c55e" }}>
        🦌 Animal Detection
      </h1>

      <br />

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>AI Detection Panel</h3>

        <p>
          Detected animals will appear here.
        </p>

        <br />

        <table
          style={{
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th>Animal</th>
              <th>Confidence</th>
              <th>Camera</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>No Data</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnimalDetection;