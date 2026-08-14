import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const send = () => {
    alert("Forgot Password feature will be connected with backend.");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Forgot Password</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <button onClick={send}>
        Send Reset Link
      </button>
    </div>
  );
}

export default ForgotPassword;