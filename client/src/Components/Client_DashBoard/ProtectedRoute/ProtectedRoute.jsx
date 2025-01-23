import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
// auth.js
const isAuthenticated = () => {
  let { UserName, Token } = useContext(AppContext);
  // Replace with your own authentication logic
  return localStorage.getItem("UserName") !== false &&
    localStorage.getItem("token") !== false
};
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
