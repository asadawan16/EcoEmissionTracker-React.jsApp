import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { AuthContext } from "../Context/AuthContext";
import "./Header.css";
import logo from "../../assets/logo.png";

const Header = () => {
  const [toggle, settoggle] = useState(false);
  const [toggle2, settoggle2] = useState(false);
  const { isloggedin, logout, userRole } = useContext(AuthContext);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [MobileMode, setMobileMode] = useState(false);
  
  useEffect(() => {
    // This will run whenever isloggedin changes, triggering a rerender of the component.
  }, [isloggedin]);
  useEffect(() => {
    // Close mobile nav if resizing to desktop view
    const handleResize = () => {
      if (window.innerWidth > 1080) {
        setMobileNavOpen(false);
        setMobileMode(false);
      } else {
        setMobileMode(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header>
      <div className="logo">
        <Link to={"/home"}>
          <img src={logo} alt="Eco Emission Tracker Logo" />
        </Link>
        <h1>
          <Link to={"/home"}>EcoEmission Tracker</Link>
        </h1>
        <button
          className="hamburger-menu"
          onClick={() => setMobileNavOpen(!isMobileNavOpen)}
        >
          ☰
        </button>
      </div>
      <nav style={{ display: isMobileNavOpen ? "none" : "block" }}>
        <ul>
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/aboutus"}>About us</Link>
          </li>
          <li>
            <Link to={"/contactus"}>Contact</Link>
          </li>
          <li>
            <Link to={"/educationalresources"}>Educational Resources</Link>
          </li>
          {MobileMode ? (
            <>
              <li>
                <Link to={"/login"}>Sign in</Link>
              </li>
              <li>
                <Link to={"/signup"}>Register</Link>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
      {isloggedin ? (
        <div className="header-btn">
          <Link
            onClick={() => {
              settoggle(!toggle);
              settoggle2(false);
            }}
          >
            Emissions <MdKeyboardArrowDown className="header-downarrow" />
          </Link>
          <ul
            className="emissionlink"
            style={{ display: toggle ? "block" : "none" }}
          >
            <li>
              <Link to={"/calculateemissions"}>Calculate Emissions</Link>
            </li>
            {userRole !== "SuperAdmin" && (
              <li>
                <Link to={"/emissionsummary"}>Emission Summary</Link>
              </li>
            )}
          </ul>
          <Link
            onClick={() => {
              settoggle2(!toggle2);
              settoggle(false);
            }}
          >
            <FaRegUser className="profile-icon" />
            <ul
              className="profile-dropdown"
              style={{ display: toggle2 ? "block" : "none" }}
            >
              {userRole == "SuperAdmin" || userRole == "Admin" ? (
                <Link to={"/adminportal"}>Admin Dashboard</Link>
              ) : null}
              <li>
                <Link to={"/userprofile"}>View Profile</Link>
              </li>
              <li>
                {" "}
                <Link to={"/"} onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </Link>
        </div>
      ) : !MobileMode ? (
        <div className="header-btn">
          <Link to={"/login"}>Sign in</Link>
          <Link to={"/signup"} className="header-login-btn">
            Register Now
          </Link>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
