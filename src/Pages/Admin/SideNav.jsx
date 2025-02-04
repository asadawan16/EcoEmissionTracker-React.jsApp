import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./AdminDashboard.css";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import './AdminDashboard.css'
const SideNav = ({ setActiveComponent, darkmode }) => {
  const { logout } = useContext(AuthContext);
  return (
      <div id="admin-header" className={darkmode ? 'DarkModeheader' : 'LightModeheader'}>
        {/* <div className={darkmode ? 'DarkMode' : 'LightMode'}> */}
          <nav>
            <ul>
              <li>
                <Link onClick={() => setActiveComponent("dashboard")}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link onClick={() => setActiveComponent("totalUsers")}>
                  Users
                </Link>
              </li>
              <li>
                <Link onClick={() => setActiveComponent("emissionRequest")}>
                  Emission Requests
                </Link>
              </li>
              <li>
                <Link onClick={() => setActiveComponent("queryRequest")}>
                  Query Requests
                </Link>
              </li>
            </ul>
            <h2>COMMON PAGES</h2>
            <ul className="common-pages">
              <li>
                <Link to={"/home"}>Home</Link>
              </li>
              <li>
                <Link to={"/aboutus"}>About us</Link>
              </li>
              <li>
                <Link to={"/contactus"}>Contact us</Link>
              </li>
              <li>
                <Link to={"/educationalresources"}>Educational Resources</Link>
              </li>
              <li>
                <Link to={"/faq"}>FAQ's</Link>
              </li>
              <li>
                <Link to={"/privacypolicy"}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={"/calculateemissions"}>Calculate Emission</Link>
              </li>
              <li>
                <Link to={"/"} onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
  );
};

export default SideNav;
