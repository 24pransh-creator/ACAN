import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await loginUser({
        email,
        password,
      });

      // Save Login
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect according to role
      switch (res.data.user.role) {
        case "superadmin":
          navigate("/super-admin");
          break;

        case "train_driver":
          navigate("/driver");
          break;

        case "railway":
          navigate("/driver");
          break;

        case "forest":
          navigate("/driver");
          break;

        case "viewer":
          navigate("/driver");
          break;

        default:
          navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
          border: "1px solid #22c55e",
        }}
      >
        <h2
          style={{
            color: "#22c55e",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          ACAN Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "12px",
            background: "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Login
        </button>

        <br />
        <br />

        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "transparent",
            color: "#22c55e",
            border: "1px solid #22c55e",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
}

export default Login;