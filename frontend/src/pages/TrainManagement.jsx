import { useEffect, useState } from "react";
import axios from "axios";

function TrainManagement() {
  const [trains, setTrains] = useState([]);

  const [form, setForm] = useState({
    trainNumber: "",
    trainName: "",
    driverName: "",
    zoneDivision: "",
    route: "",
    status: "Running",
  });

  useEffect(() => {
    loadTrains();
  }, []);

  const loadTrains = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/trains"
      );

      setTrains(res.data.trains);
    } catch (err) {
      console.log(err);
    }
  };

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addTrain = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/trains",
        form
      );

      setForm({
        trainNumber: "",
        trainName: "",
        driverName: "",
        zoneDivision: "",
        route: "",
        status: "Running",
      });

      loadTrains();
    } catch (err) {
      alert("Unable to add train");
    }
  };

  const deleteTrain = async (id) => {
    if (!window.confirm("Delete this train?")) return;

    await axios.delete(
      `http://localhost:5000/api/trains/${id}`
    );

    loadTrains();
  };

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ color: "#22c55e" }}>
        🚆 Train Management
      </h1>

      <br />

      <div style={card}>
        <input
          name="trainNumber"
          placeholder="Train Number"
          value={form.trainNumber}
          onChange={change}
          style={input}
        />

        <input
          name="trainName"
          placeholder="Train Name"
          value={form.trainName}
          onChange={change}
          style={input}
        />

        <input
          name="driverName"
          placeholder="Driver Name"
          value={form.driverName}
          onChange={change}
          style={input}
        />

        <input
          name="zoneDivision"
          placeholder="Zone Division"
          value={form.zoneDivision}
          onChange={change}
          style={input}
        />

        <input
          name="route"
          placeholder="Route"
          value={form.route}
          onChange={change}
          style={input}
        />

        <select
          name="status"
          value={form.status}
          onChange={change}
          style={input}
        >
          <option>Running</option>
          <option>Stopped</option>
          <option>Maintenance</option>
        </select>

        <button
          style={btn}
          onClick={addTrain}
        >
          Add Train
        </button>
      </div>

      <br />

      <table style={table}>
        <thead>
          <tr>
            <th>Train No</th>
            <th>Name</th>
            <th>Driver</th>
            <th>Zone</th>
            <th>Route</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {trains.map((train) => (
            <tr key={train._id}>
              <td>{train.trainNumber}</td>
              <td>{train.trainName}</td>
              <td>{train.driverName}</td>
              <td>{train.zoneDivision}</td>
              <td>{train.route}</td>
              <td>{train.status}</td>

              <td>
                <button
                  style={deleteBtn}
                  onClick={() =>
                    deleteTrain(train._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const card = {
  background: "#1f2937",
  padding: "20px",
  borderRadius: "10px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const btn = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "12px 20px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#1f2937",
};

export default TrainManagement;