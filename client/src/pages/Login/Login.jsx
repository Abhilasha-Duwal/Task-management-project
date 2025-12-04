import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axiosConfig";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import '../../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", formData);
      // Store token in localStorage
      localStorage.setItem("token", res.data.token);
      console.log("Token stored in localStorage:", localStorage.getItem("token"));
      // Redirect to Task page
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <InputField type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
          <InputField type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <Button type="submit">Login</Button>
        </form>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
