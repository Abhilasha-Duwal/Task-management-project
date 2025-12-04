import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("token"); // Get token from cookies
  console.log("authguard", token)
  if (!token) {
    // If user is not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }
  return children; // If logged in, render children
};

export default AuthGuard;
