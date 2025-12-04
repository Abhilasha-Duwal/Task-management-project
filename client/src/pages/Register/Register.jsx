import React, { useState } from "react";
import api from "../../config/axiosConfig";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import '../../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      console.log("Registered:", res.data);
      alert("Registration successful!");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h3>Create Account</h3>
        <form onSubmit={handleSubmit}>
          <InputField type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
          <InputField type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
          <InputField type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <Button type="submit">Register</Button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;
