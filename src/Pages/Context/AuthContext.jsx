import React, { createContext, useState, useEffect } from "react";
import { storeToken, checkTokenExpiration } from "./TokenManagement";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize userRole from localStorage or default to "User"
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || "User";
  });
  const [isloggedin, setisloggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setisloggedin(true);
    }

    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60 * 1000); // Check every 60 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Update localStorage whenever userRole changes
  useEffect(() => {
    localStorage.setItem("userRole", userRole);
  }, [userRole]);

  const login = () => {
    setisloggedin(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole"); // Clear userRole on logout
    setisloggedin(false);
    setUserRole("User");
  };

  return (
    <AuthContext.Provider
      value={{
        isloggedin,
        setisloggedin,
        login,
        logout,
        userRole,
        setUserRole,
        storeToken,
        checkTokenExpiration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
