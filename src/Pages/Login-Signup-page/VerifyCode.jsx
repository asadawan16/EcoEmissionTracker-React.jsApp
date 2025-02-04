import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../forget-password/forgotPassword.css";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://0.0.0.0:5090/api/auth/verify-registration",
        {
          Email: email,
          Code: code,
        }
      );

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("Invalid or expired verification code.");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://0.0.0.0:5090/api/auth/register", {
        Email: email,
      });
      alert("Verification code resent to your email.");
    } catch (error) {
      console.error("Error resending code:", error);
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleVerify} className="forgot-password-form">
        <h1>Verify Code to Register</h1>
        <input
          type="number"
          placeholder="Enter Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="verify">
          <button type="submit" className="verifybtn">
            Verify
          </button>
          <button type="button" className="resendbtn" onClick={handleResend}>
            Resend
          </button>
        </div>
        <Link to="/signup" className="cancelbtn" onClick={handleResend}>
          cancel
        </Link>
      </form>
    </div>
  );
};

export default VerifyCode;
