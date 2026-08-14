import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    employeeId: "",
    mobile: "",
    trainNumber: "",
    zoneDivision: "",
    role: "train_driver",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const save = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );

      alert("User Created Successfully");

      navigate("/super-admin/users");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to create user"
      );
    }
  };

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ color: "#22c55e" }}>
        Add New User
      </h1>

      <br />

      <input name="fullName" placeholder="Full Name" onChange={change} style={input}/>

      <input name="email" placeholder="Email" onChange={change} style={input}/>

      <input type="password" name="password" placeholder="Password" onChange={change} style={input}/>

      <input name="employeeId" placeholder="Employee ID" onChange={change} style={input}/>

      <input name="mobile" placeholder="Mobile" onChange={change} style={input}/>

      <input name="trainNumber" placeholder="Train Number" onChange={change} style={input}/>

      <input name="zoneDivision" placeholder="Zone / Division" onChange={change} style={input}/>

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

      <button style={btn} onClick={save}>
        Create User
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

export default AddUser;