import React, { useState } from "react";
import useDataFetch from "./FetchData";
import { useAddAdmin, useDeleteAdmin } from "./ManageAdminHooks";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./ManageAdmin.css";
const ManageAdmins = ({ title, endpoint, darkmode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [username, setusername] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const { data, loading, error, fetchData, pageNumber, setPageNumber } =
    useDataFetch("/manageadmin/GetAdmins", true);
  console.log(data);

  const addAdmin = useAddAdmin(`manageadmin/AddAdmin`);
  const deleteAdmin = useDeleteAdmin(`manageadmin/DeleteAdmin`);
  // Confirms if password is in correct format or not
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };
  // Adds a new admin
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await addAdmin({ name, username, email, phoneNumber, password });
      alert("Admin added successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhoneNumber("");
      setPhoneNumber("");
      fetchData(); // Refresh data
    } catch (error) {
      alert(error.message || "Failed to add admin.");
    }
  };
  // Delete an existing admin on request
  const handleDeleteAdmin = async (id) => {
    try {
      await deleteAdmin(id);
      alert("Admin deleted successfully!");
      fetchData(); // Refresh data
    } catch (error) {
      alert(error || "Failed to delete admin.");
    }
  };

  const totalPages = data?.totalPages || 1;

  return (
    <>
      <div className="Data-Table" id={darkmode ? "DarkMode" : "LightMode"}>
        <h1>{title}</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <table className="usertable">
              <thead>
                <tr className="tableheader">
                  <th>Admin Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                {data?.admins?.length > 0 ? (
                  data.admins.map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>{admin.phoneNumber}</td>
                      <td>
                        <button
                          className="removebtn"
                          onClick={() => handleDeleteAdmin(admin.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No Admins Found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="page-navigation">
              <button
                disabled={!data || pageNumber === 1}
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                Previous
              </button>
              <span className="page-info">
                Page {pageNumber} of {data?.totalPages || 1}
              </span>
              <button
                disabled={!data || pageNumber === data.totalPages}
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <div
        className="manageadmin"
        id={darkmode ? "ManageAdmindarkmode" : "LightMode"}
      >
        <h2>Add Admin</h2>
        <form onSubmit={handleAddAdmin}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            required
          />
          <label htmlFor="fullname">Username</label>
          <input
            type="text"
            name="username"
            id="Username"
            placeholder="Enter a username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            required
          />
          <label htmlFor="password">Password</label>
          <div className="password">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <IoMdEyeOff className="eye-icon" />
              ) : (
                <IoMdEye className="eye-icon" />
              )}
            </button>
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password">
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <IoMdEyeOff className="eye-icon" />
              ) : (
                <IoMdEye className="eye-icon" />
              )}
            </button>
          </div>
          <button type="submit" className="submitbtn">
            Add Admin
          </button>
        </form>
      </div>
    </>
  );
};

export default ManageAdmins;
