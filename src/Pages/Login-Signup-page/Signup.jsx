import { React, useState, useEffect, useContext } from "react";
import "./login-signup.css";
import "./animation.css";
import axios from "axios";
import { GiCrossMark } from "react-icons/gi";
import { GoArrowUpRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setpassword(newPassword);

    // Check if the password matches the regex
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };
  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmpassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://0.0.0.0:5090/api/auth/register",
        {
          Name: name,
          Username: username,
          Email: email,
          PhoneNumber: PhoneNumber,
          Password: password,
        }
      );

      console.log(response.data);
      alert(response.data.message);
      // navigate("/verify-code", { state: { email: email } }); // Pass email to verify page
      navigate("/login");
      setname("");
      setusername("");
      setemail("");
      setpassword("");
      setPhoneNumber("");
      setconfirmpassword("");
    } catch (error) {
      console.error("Error during signup:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h1>Signup</h1>
        <span>Create an account to unlock exclusive features.</span>
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <label htmlFor="fullname">Username</label>
        <input
          type="text"
          name="username"
          id="Username"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <label htmlFor="phonenumber">Phone Number</label>
        <input
          type="number"
          name="phonenumber"
          id="phonenumber"
          placeholder="Enter your phone number"
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            // onChange={(e) => setpassword(e.target.value)}
            onChange={handlePasswordChange}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          {showPassword ? (
            <IoMdEye
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <IoMdEyeOff
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <label htmlFor="confirmpassword">Re Enter Password</label>
        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Re-Enter your password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
          {showPassword ? (
            <IoMdEye
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <IoMdEyeOff
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <div className="terms">
          <input type="checkbox" name="terms" required />
          <span>I agree with Terms of Use and Privacy Policy</span>
        </div>
        <button type="submit" className="submitbtn">
          Signup
        </button>
        <span className="choice">OR</span>
        <p>
          Already have an account?{" "}
          <Link to={"/login"} className="login-link">
            Login
            <GoArrowUpRight className="login-arrow-icon" />
          </Link>
        </p>
      </form>

      <div className="design-icons">
        <GiCrossMark className="icon-1" />
        {/* <SiBlackmagicdesign className="icon-2" /> */}
        <GiCrossMark className="icon-3" />
        {/* <SiBlackmagicdesign className="icon-4" /> */}
        <GiCrossMark className="icon-5" />
        <GiCrossMark className="icon-6" />
      </div>
    </div>
  );
};

export default Signup;
