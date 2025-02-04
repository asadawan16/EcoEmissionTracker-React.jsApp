import { React, useEffect, useState } from "react";
import "./login-signup.css";
import { GiCrossMark } from "react-icons/gi";
import { SiBlackmagicdesign } from "react-icons/si";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setisloggedin, setUserRole, storeToken } = useContext(AuthContext);
  const [rememberme, setRememberme] = useState(false);
  const [toggledisabled, setToggleDisabled] = useState(false);

  async function handleLogin(event) {
    setToggleDisabled(true);
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5090/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      console.log("Setting token:", response.data.token);
      const token = response.data.token;
      // Calling storeToken method
      storeToken(token);

      // Managing login state
      setisloggedin(true);

      // Verify the logged-in user's role and persist it
      if (response.data.isSuperAdmin) {
        console.log(response.data.isSuperAdmin);
        setUserRole("SuperAdmin");
        localStorage.setItem("userRole", "SuperAdmin"); // Persist role
        navigate("/adminportal"); // Redirect to Super Admin dashboard
      } else if (response.data.isAdmin) {
        setUserRole("Admin");
        localStorage.setItem("userRole", "Admin"); // Persist role
        navigate("/adminportal"); // Redirect to Admin dashboard
      } else {
        setUserRole("User");
        localStorage.setItem("userRole", "User"); // Persist role
        navigate("/home"); // Redirect to user home page
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your email and password.");
      setToggleDisabled(false);
    }
  }

  return (
    <div className="login-container">
      <form action="" onSubmit={handleLogin}>
        <h1>Login</h1>
        <span>Welcome back! Please log in to access your account.</span>
        <label htmlFor="email" className="login-email">
          Email or Username
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="login-email"
          placeholder="Enter your email or username"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <label htmlFor="password" className="login-password">
          Password
        </label>
        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
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
        <Link to={"/forgotpassword"} className="forgotpassword">
          Forgot Password?
        </Link>
        {/* <div className="remember-me">
          <input
            type="checkbox"
            name="rememberme"
            id="rememberme"
            checked={rememberme}
            onChange={(e) => setRememberme(e.target.checked)}
          />
          <span htmlFor="rememberme">Remember me</span>
        </div> */}
        <button
          type="submit"
          className="submitbtn"
          disabled={toggledisabled}
          style={toggledisabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}
        >
          Login
        </button>
        <span className="choice">OR</span>
        <p>
          Don't have an account?{" "}
          <Link to={"/signup"} className="login-link">
            Signup
            <GoArrowUpRight className="signup-arrow-icon" />
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
export default Login;
