import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-primary btn-lg w-100 rounded-pill shadow-sm ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
