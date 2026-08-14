import { useEffect, useState } from "react";
import axios from "axios";

function CameraManagement() {
  const [cameras, setCameras] = useState([]);

  const [form, setForm] = useState({
    cameraName: "",
    cameraId: "",
    location: "",
    railwayZone: "",
    ipAddress: "",
    streamUrl: "",
    status: "Online",
  });

  useEffect(() => {
    loadCameras();
  }, []);

  const loadCameras = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/cameras"
      );

      setCameras(res.data.cameras);
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

  const addCamera = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/cameras",
        form
      );

      setForm({
        cameraName: "",
        cameraId: "",
        location: "",
        railwayZone: "",
        ipAddress: "",
        streamUrl: "",
        status: "Online",
      });

      loadCameras();
    } catch (err) {
      alert("Unable to add camera");
    }
  };

  const deleteCamera = async (id) => {
    if (!window.confirm("Delete this camera?")) return;

    await axios.delete(
      `http://localhost:5000/api/cameras/${id}`
    );

    loadCameras();
  };

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ color: "#22c55e" }}>
        📹 Camera Management
      </h1>

      <br />

      <div style={card}>
        <input
          style={input}
          name="cameraName"
          placeholder="Camera Name"
          value={form.cameraName}
          onChange={change}
        />

        <input
          style={input}
          name="cameraId"
          placeholder="Camera ID"
          value={form.cameraId}
          onChange={change}
        />

        <input
          style={input}
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={change}
        />

        <input
          style={input}
          name="railwayZone"
          placeholder="Railway Zone"
          value={form.railwayZone}
          onChange={change}
        />

        <input
          style={input}
          name="ipAddress"
          placeholder="IP Address"
          value={form.ipAddress}
          onChange={change}
        />

        <input
          style={input}
          name="streamUrl"
          placeholder="Stream URL"
          value={form.streamUrl}
          onChange={change}
        />

        <select
          style={input}
          name="status"
          value={form.status}
          onChange={change}
        >
          <option>Online</option>
          <option>Offline</option>
        </select>

        <button
          style={btn}
          onClick={addCamera}
        >
          Add Camera
        </button>
      </div>

      <br />

      <table style={table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Location</th>
            <th>Zone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cameras.map((camera) => (
            <tr key={camera._id}>
              <td>{camera.cameraName}</td>
              <td>{camera.cameraId}</td>
              <td>{camera.location}</td>
              <td>{camera.railwayZone}</td>
              <td>{camera.status}</td>

              <td>
                <button
                  style={deleteBtn}
                  onClick={() => deleteCamera(camera._id)}
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

export default CameraManagement;