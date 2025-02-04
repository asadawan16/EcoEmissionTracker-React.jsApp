import { Navigate } from "react-router-dom";

// Storing Token with expiration time
export const storeToken = (token) => {
    const expirationTime = new Date().getTime() + 60 * 60 * 1000; // Current time + 60 minutes
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiration", expirationTime.toString());
  };

//   Token Expiration Check
export   const checkTokenExpiration = () => {
    const expirationTime = localStorage.getItem("tokenExpiration");
    const currentTime = new Date().getTime();
  
    if (expirationTime && currentTime > parseInt(expirationTime)) {
      // Token has expired
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiration");
      console.log("Token expired and removed");
      Navigate('/login');
    }
  };