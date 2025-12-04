import React from "react";

const InputField = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  required = false,
}) => {
  return (
    <div className="mb-3">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control form-control-lg rounded-pill ${className}`}
        required={required}
      />
    </div>
  );
};

export default InputField;
