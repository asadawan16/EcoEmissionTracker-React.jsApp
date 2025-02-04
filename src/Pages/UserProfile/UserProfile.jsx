import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import profileimg from "../../assets/profile.png";
import apiClient from "../../api";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    username: false,
    password: false,
    changePassword: false,
  });
  const GetUserData = async () => {
    try {
      const response = await apiClient.get("/profile/getProfile");
      console.log("Response:", response.data);

      const { name, userName, email, phoneNumber } = response.data;
      // Populate state with the user's profile data
      setProfile(response.data);
      setName(name || "");
      setEmail(email || "");
      setPhone(phoneNumber || "");
      setUsername(userName || "");
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    GetUserData();
  }, []);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const handleCancelClick = (field) => {
    // Reset editing state
    setIsEditing((prev) => ({ ...prev, [field]: false }));

    // Reset field to its original value
    switch (field) {
      case "phone":
        setPhone(profile.phoneNumber || ""); // Revert to original phone number
        break;
      case "name":
        setName(profile.name || ""); // Revert to original name
        break;
      case "email":
        setEmail(profile.email || ""); // Revert to original email
        break;
      case "username":
        setUsername(profile.username || ""); // Revert to original username
        break;
      default:
        break;
    }
  };

  const handleUpdate = async (field) => {
    if (currentPassword === "") {
      return alert("Please Enter current password first to continue");
    }
    try {
      const updateData = {
        Name: name,
        Email: email,
        PhoneNumber: phone,
        Username: username,
        CurrentPassword: currentPassword,
      };

      // Remove null fields to avoid unnecessary validation errors
      Object.keys(updateData).forEach(
        (key) => updateData[key] === null && delete updateData[key]
      );

      // Send the update request
      const response = await apiClient.put(
        "/profile/update-profile",
        updateData
      );

      // Log success and update local state
      console.log("Profile updated successfully:", response.data.message);
      setProfile((prev) => ({ ...prev, ...updateData }));
      setIsEditing((prev) => ({ ...prev, [field]: false }));
      setIsEditing((prev) => ({ ...prev, password: false }));
      setCurrentPassword("");
      alert("Profile updated successfully.");
    } catch (error) {
      // Log and display errors
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );

      const errorMessage =
        error.response?.data ||
        "An error occurred while updating the profile. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div id="userProfile">
      <Header />
      <div className="profile-bg">
        <div className="overlay">
          <h1>Profile</h1>
        </div>
      </div>

      <form className="profile-form">
        <div className="profile-image">
          <img src={profileimg} alt="Profile" />
          <input
            type="file"
            name="change-image"
            id="change-image"
            placeholder="Change Photo"
          />
        </div>

        <div className="profile-info">
          <label htmlFor="name">Name</label>
          <div className="profile-data">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={!isEditing.name}
            />
            <button
              type="button"
              onClick={() =>
                isEditing.phone ? handleUpdate("name") : handleEditClick("name")
              }
            >
              {isEditing.phone ? "Save" : "Edit"}
            </button>
            {isEditing.name && (
              <button type="button" onClick={() => handleCancelClick("name")}>
                Cancel
              </button>
            )}
          </div>

          <label htmlFor="email">Email</label>
          <div className="profile-data">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!isEditing.email}
            />
            <button
              type="button"
              onClick={() =>
                isEditing.email
                  ? handleUpdate("email")
                  : handleEditClick("email")
              }
            >
              {isEditing.email ? "Save" : "Edit"}
            </button>
            {isEditing.email && (
              <button type="button" onClick={() => handleCancelClick("email")}>
                Cancel
              </button>
            )}
          </div>

          <label htmlFor="phone">Phone Number</label>
          <div className="profile-data">
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              readOnly={!isEditing.phone}
            />
            <button
              type="button"
              onClick={() =>
                isEditing.phone
                  ? handleUpdate("phone")
                  : handleEditClick("phone")
              }
            >
              {isEditing.phone ? "Save" : "Edit"}
            </button>
            {isEditing.phone && (
              <button type="button" onClick={() => handleCancelClick("phone")}>
                Cancel
              </button>
            )}
          </div>

          <label htmlFor="username">Username</label>
          <div className="profile-data">
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              readOnly={!isEditing.username}
            />
            <button
              type="button"
              onClick={() =>
                isEditing.username
                  ? handleUpdate("username")
                  : handleEditClick("username")
              }
            >
              {isEditing.username ? "Save" : "Edit"}
            </button>
            {isEditing.username && (
              <button
                type="button"
                onClick={() => handleCancelClick("username")}
              >
                Cancel
              </button>
            )}
          </div>

          <label htmlFor="password">Password</label>
          <div className="profile-data">
            <div className="profile-password">
              <input
                type={showPassword ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                placeholder="Current Password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                readOnly={!isEditing.password}
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
            {isEditing.password && (
              <div className="profile-password">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  readOnly={!isEditing.changePassword}
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
            )}
            <button
              type="button"
              onClick={() =>
                isEditing.password
                  ? handleUpdate("password")
                  : handleEditClick("password")
              }
            >
              {isEditing.password ? "Save" : "Edit"}
            </button>
            {isEditing.password && (
              <button
                type="button"
                onClick={() => handleCancelClick("password")}
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={() =>
                isEditing.changePassword
                  ? handleUpdate("password")
                  : handleEditClick("password")
              }
            >
              {isEditing.password ? "Save new password" : "change password"}
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default UserProfile;
