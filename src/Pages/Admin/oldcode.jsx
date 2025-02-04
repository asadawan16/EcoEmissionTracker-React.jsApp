// import { useState, useEffect, React, useContext } from "react";
// import "./AdminDashboard.css";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import { FaRegUser } from "react-icons/fa6";
// import usericon from "../../assets/user-icon.png";
// import queryicon from "../../assets/query-icon.png";
// import emissionicon from "../../assets/emission-icon.png";
// import SideNav from "./SideNav";
// import apiClient from "../../api";
// import LineChart from "../Charts/LineChart";
// import PieChart from "../Charts/PieChart";
// import { AuthContext } from "../Context/AuthContext";
// const AdminDashboard = () => {
//   const { userRole } = useContext(AuthContext);
//   useEffect(() => {
//     if (userRole != "SuperAdmin") {
//       navigate("/home");
//     }
//   }, []);
//   const navigate = useNavigate();
//   const [emissionData, setEmissionData] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalEmissionResponses, setTotalEmissionResponses] = useState(0);
//   const [totalContactMessages, setTotalContactMessages] = useState(0);
//   const [toggle, settoggle] = useState(false);
//   const OptionData = [
//     {
//       id: 1,
//       title: "Total Users",
//       value: totalUsers,
//       icon: usericon,
//     },
//     {
//       id: 2,
//       title: "Emission Request",
//       value: totalEmissionResponses,
//       icon: emissionicon,
//     },
//     {
//       id: 3,
//       title: "Query Request",
//       value: totalContactMessages,
//       icon: queryicon,
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const usersResponse = await apiClient.get(
//           "/admindashboard/total-users"
//         );
//         setTotalUsers(usersResponse.data);

//         const emissionsResponse = await apiClient.get(
//           "/admindashboard/total-emission-responses"
//         );
//         setTotalEmissionResponses(emissionsResponse.data);

//         const contactsResponse = await apiClient.get(
//           "/admindashboard/total-contact-messages"
//         );
//         setTotalContactMessages(contactsResponse.data);

//         const emissionDataResponse = await apiClient.get(
//           "/emission/getEmissionData"
//         );
//         console.log(emissionDataResponse.data);
//         setEmissionData(emissionDataResponse.data);
//       } catch (error) {
//         console.error(
//           "Error fetching dashboard data:",
//           error.response?.data || error.message
//         );
//       }
//     };

//     fetchData();
//   }, []);
//   return (
//     <>
//       <div className="header-top">
//         <div className="logo">
//           <Link to={"/home"}>
//             <img src={logo} alt="Eco Emission Tracker Logo" />
//           </Link>
//           <h1>
//             <Link to={"/home"}>Eco Emission Tracker</Link>
//           </h1>
//         </div>
//         <div className="profile">
//           <FaRegUser className="profile-icon" />
//         </div>
//       </div>
//       <div id="admin-portal">
//         <SideNav />
//         <div className="admin-dashboard">
//           <h1>Dashboard</h1>
//           <ul className="option-grid">
//             {OptionData.map((option) => {
//               return (
//                 <li key={option.id} className="option">
//                   <div className="option-info">
//                     <h2>{option.title}</h2>
//                     <p>{option.value}</p>
//                   </div>
//                   <div className="option-icon">
//                     <img src={option.icon} alt="icon" />
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//           <div>
//             <div style={{ width: "30%", margin: "auto", marginTop: "20px" }}>
//               <PieChart />
//             </div>
//             <div style={{ width: "50%", margin: "auto" }}>
//               <h2>Emission Trends</h2>
//               <LineChart />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;