import { useState } from "react";
import { signupUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "train_driver",
    employeeId: "",
    mobile: "",
    trainNumber: "",
    zoneDivision: "",
  });

  const signup = async () => {
    try {
      await signupUser(form);
      alert("User Created Successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Signup</h1>

      <input placeholder="Name"
        onChange={(e)=>setForm({...form,fullName:e.target.value})} />

      <br/><br/>

      <input placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})} />

      <br/><br/>

      <input type="password" placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})} />

      <br/><br/>

      <button onClick={signup}>
        Create User
      </button>
    </div>
  );
}

export default Signup;