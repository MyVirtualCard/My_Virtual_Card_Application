import React from "react";
import { Navigate } from "react-router-dom";
// auth.js
 const isAuthenticated = () => {
    // Replace with your own authentication logic
    return localStorage.getItem("sadmin") !== null;
  };
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin_login" />;
};

export default ProtectedRoute;