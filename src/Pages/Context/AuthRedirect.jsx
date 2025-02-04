import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function AuthRedirect({ children }) {
  const navigate = useNavigate();
  const {isloggedin} = useContext(AuthContext); 

  useEffect(() => {
    if (isloggedin) {
      navigate('/home', { replace: true });
    }
  }, [isloggedin, navigate]);

  if (isloggedin) {
    return null; // Prevent rendering of the child component if logged in
  }

  return children; // Render the child component (e.g., Signup or Login) only if not logged in
}

export default AuthRedirect;
