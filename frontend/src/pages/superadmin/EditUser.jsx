import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    employeeId: "",
    mobile: "",
    trainNumber: "",
    zoneDivision: "",
    role: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/users"
      );

      const user = res.data.users.find((u) => u._id === id);

      if (user) {
        setForm(user);
      }
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

  const update = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/auth/users/${id}`,
        form
      );

      alert("User Updated Successfully");

      navigate("/super-admin/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ color: "#22c55e" }}>
        Edit User
      </h1>

      <br />

      <input
        name="fullName"
        value={form.fullName}
        onChange={change}
        placeholder="Full Name"
        style={input}
      />

      <input
        name="email"
        value={form.email}
        onChange={change}
        placeholder="Email"
        style={input}
      />

      <input
        name="employeeId"
        value={form.employeeId}
        onChange={change}
        placeholder="Employee ID"
        style={input}
      />

      <input
        name="mobile"
        value={form.mobile}
        onChange={change}
        placeholder="Mobile"
        style={input}
      />

      <input
        name="trainNumber"
        value={form.trainNumber}
        onChange={change}
        placeholder="Train Number"
        style={input}
      />

      <input
        name="zoneDivision"
        value={form.zoneDivision}
        onChange={change}
        placeholder="Zone / Division"
        style={input}
      />

      <select
        name="role"
        value={form.role}
        onChange={change}
        style={input}
      >
        <option value="train_driver">Train Driver</option>
        <option value="railway">Railway Officer</option>
        <option value="forest">Forest Officer</option>
        <option value="viewer">Viewer</option>
      </select>

      <button
        style={btn}
        onClick={update}
      >
        Update User
      </button>
    </div>
  );
}

const input = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "5px",
};

const btn = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default EditUser;