import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import SideNav from "./SideNav";
import DataTable from "./DataTable";
import PieChart from "../Charts/PieChart";
import LineChart from "../Charts/LineChart";
import logo from "../../assets/logo.png";
import usericon from "../../assets/user-icon.png";
import queryicon from "../../assets/query-icon.png";
import emissionicon from "../../assets/emission-icon.png";
import "./AdminDashboard.css";
import { AuthContext } from "../Context/AuthContext";
import useDataFetch from "./FetchData";
import ManageAdmins from "./ManageAdmins";
import { FaToggleOff } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard"); // Currently active component
  const { userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileToggle, setProfileToggle] = useState(false);
  const [toggleDarkMode, setToggleDarkMode] = useState(false);

  useEffect(() => {
    if (userRole !== "SuperAdmin" && userRole !== "Admin") {
      navigate("/home");
    }
  }, [userRole]);

  // Fetch totals for the dashboard summary
  const { data: totalUsersData } = useDataFetch(
    "/admindashboard/total-users",
    false
  );
  const { data: emissionSummaryData } = useDataFetch(
    "/admindashboard/total-emission-responses",
    false
  );
  const { data: contactMessagesData } = useDataFetch(
    "/admindashboard/total-contact-messages",
    false
  );
  const { data: TotalAdmins } = useDataFetch(
    "/manageadmin/GetTotalAdmins",
    false
  );

  const [toggle, setToggle] = useState({
    totalUsers: false,
    emissionRequests: false,
    queryRequests: false,
  });

  const handleToggle = (key) => {
    setToggle({
      totalUsers: key === "totalUsers",
      emissionRequest: key === "emissionRequest",
      queryRequest: key === "queryRequest",
    });
  };

  const OptionData = [
    {
      id: 1,
      title: "Total Users",
      value: totalUsersData || 0,
      icon: usericon,
      component: "totalUsers",
      toggle: "totalUsers",
    },
    {
      id: 2,
      title: "Emission Request",
      value: emissionSummaryData || 0,
      icon: emissionicon,
      component: "emissionRequests",
      toggle: "emissionRequest",
    },
    {
      id: 3,
      title: "Query Request",
      value: contactMessagesData || 0,
      icon: queryicon,
      component: "queryRequests",
      toggle: "queryRequest",
    },
    userRole === "SuperAdmin"
      ? {
          id: 4,
          title: "Sub Admins",
          value: TotalAdmins || 0,
          icon: usericon,
          component: "SubAdmins",
          toggle: "subadmins",
        }
      : null,
  ].filter(Boolean);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "totalUsers":
        return (
          <DataTable
            title="Total Users"
            endpoint="/admindashboard/getusers"
            toggle={toggle}
            darkmode={toggleDarkMode}
            searchKey="username" // Enable search by username
            showSearchBar={true} // Show search bar
            filterOptions={[
              { label: "Role: Admin", key: "role", value: "Admin" },
              { label: "Role: User", key: "role", value: "User" },
            ]}
          >
            <th>User id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>ID</th>
            <th>Role</th>
          </DataTable>
        );

      case "emissionRequests":
        return (
          <DataTable
            title="Emission Requests"
            endpoint="/emission/getEmissionSummary"
            toggle={toggle}
            darkmode={toggleDarkMode}
            searchKey="userId" // Enable search by User ID
            showSearchBar={true} // Show search bar
          >
            <th>Userid</th>
            <th>Emission Category</th>
            <th>Emission Description</th>
            <th>Emission Quantity</th>
            <th>Unit</th>
            <th>Total Emissions</th>
            <th>Date</th>
          </DataTable>
        );

      case "queryRequests":
        return (
          <DataTable
            title="Query Requests"
            endpoint="/contact/getContactMessages"
            toggle={toggle}
            darkmode={toggleDarkMode}
            searchKey="email" // Enable search by email
          >
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
          </DataTable>
        );

      case "SubAdmins":
        return (
          <ManageAdmins
            title="Sub Admins"
            endpoint="manageadmin"
            toggle={toggle}
            darkmode={toggleDarkMode}
          />
        );

      default:
        return (
          <>
            <div>
              <PieChart darkmode={toggleDarkMode} />
            </div>
            <div>
              <LineChart darkmode={toggleDarkMode} />
            </div>
          </>
        );
    }
  };

  return (
    <div className={toggleDarkMode ? "DarkMode" : "LightMode"}>
      <div className="header-top">
        <div className="logo">
          <Link to={"/home"}>
            <img src={logo} alt="Eco Emission Tracker Logo" />
          </Link>
          <h1>
            <Link to={"/home"} className="app-title">
              Eco Emission Tracker
            </Link>
          </h1>
        </div>
        <div className="profile">
          <button
            className="mode"
            onClick={() => setToggleDarkMode(!toggleDarkMode)}
          >
            {toggleDarkMode ? (
              <>
                <span id="mode-title">Light Mode</span>
                <FaToggleOn className="darkmode-icon" />
              </>
            ) : (
              <>
                <span id="mode-title">Dark Mode</span>
                <FaToggleOff className="darkmode-icon" />
              </>
            )}
          </button>
          <Link onClick={() => setProfileToggle(!profileToggle)}>
            <FaRegUser id="profile-icon" />
            <ul
              id="profile-dropdown"
              style={{ display: profileToggle ? "block" : "none" }}
            >
              <li>
                <Link to={"/userprofile"}>View Profile</Link>
              </li>
              <li>
                <Link to={"/"} onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </Link>
        </div>
      </div>
      <div id="admin-portal">
        <SideNav
          handleToggle={setToggle}
          darkmode={toggleDarkMode}
          toggle={toggle}
        />
        <div className="admin-dashboard">
          <h1 onClick={() => setActiveComponent("dashboard")}>Dashboard</h1>
          <ul className="option-grid">
            {OptionData.map((option) => (
              <li
                key={option.id}
                className="option"
                onClick={() => {
                  setActiveComponent(option.component);
                  handleToggle(option.toggle);
                }}
              >
                <div className="option-info">
                  <h2>{option.title}</h2>
                  <p>{option.value}</p>
                </div>
                <div className="option-icon">
                  <img src={option.icon} alt="icon" />
                </div>
              </li>
            ))}
          </ul>
          <div className="component-container">{renderActiveComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
